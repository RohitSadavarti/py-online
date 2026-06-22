// ============================================================
// main.js
// Application entry point.
// Bootstraps everything on DOMContentLoaded and wires all
// button/input events to their handler functions.
//
// Load order in index.html must be:
//   questions.js → config.js → storage.js → theme.js →
//   runtime.js → editor.js → runner.js → navigation.js →
//   output.js → browse.js → progress.js → main.js
// ============================================================

// ---- Shared utility -------------------------------------------

/** Escapes HTML special characters to prevent XSS when inserting text into innerHTML */
function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, m => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[m]));
}

// ---- Bootstrap ------------------------------------------------

window.addEventListener('DOMContentLoaded', () => {
  // Initialise the question pool
  filteredQuestions = QUESTIONS.slice();

  // Apply saved theme before anything renders
  applyTheme(progress.theme || 'dark');

  // Render UI
  renderQuestionList();
  loadQuestion(0);
  updateProgressBar();

  // Wire all interactive controls
  wireGlobalControls();

  // Start async inits (order matters: Monaco first, then Pyodide)
  initMonaco();
  initPyodide();
});

// ---- Event wiring ----------------------------------------------

function wireGlobalControls() {
  // Editor toolbar
  document.getElementById('run-btn').onclick        = runCode;
  document.getElementById('reset-btn').onclick      = resetCode;
  document.getElementById('solution-btn').onclick   = showSolution;
  document.getElementById('fullscreen-btn').onclick = toggleFullscreen;

  // Left-panel footer
  document.getElementById('next-btn').onclick       = nextQuestion;
  document.getElementById('bookmark-btn').onclick   = toggleBookmark;
  document.getElementById('notes-area').onblur      = saveNote;
  document.getElementById('export-code-btn').onclick = exportCode;

  // Header
  document.getElementById('theme-toggle').onclick   = toggleTheme;
  document.getElementById('browse-btn').onclick     = openBrowsePanel;
  document.getElementById('random-btn').onclick     = randomChallenge;
  document.getElementById('achievements-btn').onclick = showAchievementsPanel;

  // Browse overlay
  document.getElementById('browse-close').onclick   = closeBrowsePanel;
  document.getElementById('search-input').oninput   = applyFilters;
  document.getElementById('filter-library').onchange   = applyFilters;
  document.getElementById('filter-difficulty').onchange = applyFilters;
  document.getElementById('filter-bookmarked').onchange = applyFilters;

  // Achievements overlay
  document.getElementById('achievements-close').onclick = () => {
    document.getElementById('achievements-overlay').classList.remove('open');
  };
}
