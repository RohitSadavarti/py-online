// ============================================================
// editor.js
// Monaco code editor initialisation and editor toolbar actions.
// Monaco CDN version is set in index.html <script src=...>.
// To change editor options (font size, theme, keybindings),
// edit the monaco.editor.create() call below.
// ============================================================

function initMonaco() {
  require.config({
    paths: { vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.44.0/min/vs' },
  });
  require(['vs/editor/editor.main'], function () {
    monacoEditor = monaco.editor.create(document.getElementById('editor'), {
      value: getCurrentQuestion().starterCode,
      language: 'python',
      theme: progress.theme === 'dark' ? 'vs-dark' : 'vs',
      fontSize: 14,
      automaticLayout: true,
      minimap: { enabled: false },
      tabSize: 4,
      insertSpaces: true,
      scrollBeyondLastLine: false,
    });
    // Ctrl/Cmd + Enter to run code
    monacoEditor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => runCode());
    document.getElementById('editor-loading').style.display = 'none';
  });
}

// ---- Editor toolbar actions ----------------------------------------

function resetCode() {
  if (monacoEditor) monacoEditor.setValue(getCurrentQuestion().starterCode);
}

function showSolution() {
  if (!confirm('This will replace your current code with the reference solution. Continue?')) return;
  if (monacoEditor) monacoEditor.setValue(getCurrentQuestion().solution);
}

function toggleFullscreen() {
  document.getElementById('center-panel').classList.toggle('fullscreen');
  // Monaco needs a layout nudge after the container resizes
  if (monacoEditor) setTimeout(() => monacoEditor.layout(), 50);
}

function exportCode() {
  const q = getCurrentQuestion();
  const blob = new Blob([monacoEditor.getValue()], { type: 'text/x-python' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `q${q.id}_${q.title.replace(/\s+/g, '_').toLowerCase()}.py`;
  a.click();
  URL.revokeObjectURL(url);
}
