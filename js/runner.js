// ============================================================
// runner.js
// Code execution pipeline and answer validation.
//
// runCode()  — orchestrates the full run: package install →
//              Python execution → chart extraction → validate →
//              render result → record attempt.
//
// validate() — compares extracted chart metadata against the
//              question's expectedOutput + validationRules.
//              To add a new validation rule type:
//                1. Add a key to the question's validationRules array in questions.js
//                2. Add a matching `if (want('yourKey'))` block below
// ============================================================

function setRunnerStatus(state, msg) {
  const el = document.getElementById('runner-status');
  el.className = 'runner-status status-' + state;
  el.textContent = msg;
}

async function runCode() {
  const q = getCurrentQuestion();
  if (!pyodideReady) {
    setRunnerStatus('error', 'Python runtime is still loading — please wait.');
    return;
  }

  document.getElementById('run-btn').disabled = true;
  renderOutputRunning();

  // Determine which packages this question needs
  const requiredLibs =
    q.library === 'seaborn' ? ['matplotlib', 'pandas', 'numpy', 'seaborn']
    : q.library === 'plotly' ? ['plotly']
    : ['matplotlib', 'pandas', 'numpy'];

  try {
    await ensurePackages(requiredLibs);
  } catch (e) {
    renderOutputError('Failed to install required packages: ' + e.message);
    document.getElementById('run-btn').disabled = false;
    setRunnerStatus('error', 'Package install failed.');
    return;
  }

  setRunnerStatus('loading', 'Running your code…');

  const userCode = monacoEditor.getValue();
  let stdoutBuf = '', stderrBuf = '';
  pyodide.setStdout({ batched: s => { stdoutBuf += s + '\n'; } });
  pyodide.setStderr({ batched: s => { stderrBuf += s + '\n'; } });

  // Inject the dataset as a DataFrame named `df` before running user code
  pyodide.globals.set('_dataset_json', JSON.stringify(q.dataset));
  const prelude = `
import json, pandas as pd
_d = json.loads(_dataset_json)
df = pd.DataFrame(_d['rows'], columns=_d['columns'])
`;
  const mplReset = q.library !== 'plotly' ? `
import matplotlib.pyplot as plt
plt.close('all')
` : '';

  try {
    await pyodide.runPythonAsync(prelude + mplReset);
    await pyodide.runPythonAsync(userCode);
  } catch (e) {
    pyodide.setStdout({}); pyodide.setStderr({});
    renderOutputError(formatPyError(e), stdoutBuf);
    document.getElementById('run-btn').disabled = false;
    setRunnerStatus('error', 'Your code raised an error.');
    return;
  }

  let meta;
  try {
    meta = q.library === 'plotly'
      ? await extractPlotly()
      : await extractMatplotlib();
  } catch (e) {
    pyodide.setStdout({}); pyodide.setStderr({});
    renderOutputError(
      'Could not read a chart from your code. Did you build a figure ' +
      '(e.g. plt.plot(), sns.barplot(), fig = px.line())?\n\n' + e.message,
      stdoutBuf,
    );
    document.getElementById('run-btn').disabled = false;
    setRunnerStatus('error', 'No chart detected.');
    return;
  }
  pyodide.setStdout({}); pyodide.setStderr({});

  if (meta.error) {
    renderOutputError('Could not read a chart from your code: ' + meta.error, stdoutBuf);
    document.getElementById('run-btn').disabled = false;
    setRunnerStatus('error', 'No chart detected.');
    return;
  }

  const checks = validate(q, meta);
  const passed = checks.every(c => c.pass);

  renderOutputResult(q, meta, checks, passed, stdoutBuf);
  document.getElementById('run-btn').disabled = false;

  recordAttempt(q.id, passed);
  if (passed) {
    setRunnerStatus('success', 'Correct! Great work.');
    markSolved(q.id);
  } else {
    setRunnerStatus('error', 'Not quite — check the validation checklist below.');
  }
  renderLeftPanel();
}

// ---- Validation helpers --------------------------------------------

/** Case-insensitive substring match (empty expected = always pass) */
function strMatch(actual, expected) {
  if (!expected) return true;
  return (actual || '').trim().toLowerCase().includes(expected.trim().toLowerCase());
}

/**
 * Runs all active validation rules for a question.
 * Returns an array of { label, pass } objects shown in the checklist.
 */
function validate(q, meta) {
  const checks = [];
  const exp  = q.expectedOutput;
  const want = key => (q.validationRules || []).includes(key);

  if (want('type')) {
    checks.push({
      label: `Chart type looks like "${exp.type}"`,
      pass: !exp.type || exp.type === 'other' || meta.chart_type === exp.type,
    });
  }
  if (want('title')) {
    checks.push({ label: `Title contains "${exp.title}"`, pass: strMatch(meta.title, exp.title) });
  }
  if (want('xlabel')) {
    checks.push({ label: `X-axis label set to "${exp.xlabel}"`, pass: strMatch(meta.xlabel, exp.xlabel) });
  }
  if (want('ylabel')) {
    checks.push({ label: `Y-axis label set to "${exp.ylabel}"`, pass: strMatch(meta.ylabel, exp.ylabel) });
  }
  if (want('legend')) {
    checks.push({ label: exp.legend ? 'Legend is shown' : 'Legend present', pass: meta.has_legend === true });
  }
  if (want('minAxes')) {
    checks.push({
      label: `At least ${exp.minAxes} subplot panel(s) detected`,
      pass: (meta.num_axes || 1) >= exp.minAxes,
    });
  }

  // Fallback: always pass if no rules declared
  if (checks.length === 0) {
    checks.push({ label: 'A chart was generated', pass: true });
  }
  return checks;
}
