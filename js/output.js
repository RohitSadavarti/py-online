// ============================================================
// output.js
// Right-panel output rendering for all four states:
//   idle → running → error / result
//
// renderOutputResult() handles both Plotly (interactive) and
// Matplotlib/Seaborn (base64 PNG) chart display.
// ============================================================

function renderOutputIdle() {
  document.getElementById('output-status').textContent  = 'Idle';
  document.getElementById('output-status').className   = 'status-pill status-idle';
  document.getElementById('chart-area').innerHTML      = '<div class="output-placeholder">Run your code to see the chart here.</div>';
  document.getElementById('console-area').textContent  = '';
  document.getElementById('checklist').innerHTML       = '';
  document.getElementById('result-banner').style.display = 'none';
}

function renderOutputRunning() {
  document.getElementById('output-status').textContent  = 'Running…';
  document.getElementById('output-status').className   = 'status-pill status-running';
  document.getElementById('chart-area').innerHTML      = '<div class="output-placeholder">Executing…</div>';
  document.getElementById('result-banner').style.display = 'none';
}

function renderOutputError(message, stdout) {
  document.getElementById('output-status').textContent  = 'Error';
  document.getElementById('output-status').className   = 'status-pill status-fail';
  document.getElementById('chart-area').innerHTML      = '<div class="output-placeholder error-placeholder">No chart produced</div>';
  document.getElementById('console-area').textContent  = (stdout || '') + '\n' + message;
  document.getElementById('checklist').innerHTML       = '';
  document.getElementById('result-banner').className   = 'result-banner fail';
  document.getElementById('result-banner').textContent = 'Incorrect Answer. Try Again.';
  document.getElementById('result-banner').style.display = 'block';
}

function renderOutputResult(q, meta, checks, passed, stdout) {
  document.getElementById('output-status').textContent  = passed ? 'Success' : 'Needs work';
  document.getElementById('output-status').className   = 'status-pill ' + (passed ? 'status-pass' : 'status-fail');

  // ---- Chart display ----
  const chartArea = document.getElementById('chart-area');
  if (q.library === 'plotly' && meta.fig_json) {
    chartArea.innerHTML = '<div id="plotly-target" style="width:100%;height:100%;"></div>';
    try {
      const parsed = JSON.parse(meta.fig_json);
      const layout = Object.assign({}, parsed.layout, {
        paper_bgcolor: 'transparent',
        plot_bgcolor:  'transparent',
        font: { color: getComputedStyle(document.documentElement).getPropertyValue('--text-primary') },
        margin: { t: 40, l: 40, r: 20, b: 40 },
      });
      Plotly.newPlot('plotly-target', parsed.data, layout, { responsive: true, displaylogo: false });
    } catch (e) {
      chartArea.innerHTML = '<div class="output-placeholder error-placeholder">Could not render interactive chart.</div>';
    }
  } else if (meta.image) {
    chartArea.innerHTML = `<img class="chart-image" src="data:image/png;base64,${meta.image}" alt="Generated chart" />`;
  } else {
    chartArea.innerHTML = '<div class="output-placeholder">No chart image available.</div>';
  }

  // ---- Console output ----
  document.getElementById('console-area').textContent = stdout || '';

  // ---- Validation checklist ----
  const checklist = document.getElementById('checklist');
  checklist.innerHTML = '<div class="checklist-title">Validation Checklist</div>' +
    checks.map(c =>
      `<div class="check-item ${c.pass ? 'pass' : 'fail'}">` +
      `<span class="check-icon">${c.pass ? '✓' : '✗'}</span>${escapeHtml(c.label)}</div>`
    ).join('');

  // ---- Result banner ----
  const banner = document.getElementById('result-banner');
  banner.className    = 'result-banner ' + (passed ? 'pass' : 'fail');
  banner.textContent  = passed ? 'Correct Answer!' : 'Incorrect Answer. Try Again.';
  banner.style.display = 'block';
}
