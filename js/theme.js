// ============================================================
// theme.js
// Dark / light theme management.
// To add a new theme: add a new data-theme CSS block in
// css/styles.css and update applyTheme() below.
// ============================================================

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  progress.theme = theme;
  saveProgress();
  const btn = document.getElementById('theme-toggle');
  if (btn) btn.textContent = theme === 'dark' ? '☀️ Light' : '🌙 Dark';
}

function toggleTheme() {
  const next = progress.theme === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  if (monacoEditor) monaco.editor.setTheme(next === 'dark' ? 'vs-dark' : 'vs');
}
