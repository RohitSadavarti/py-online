// ============================================================
// browse.js
// Browse-questions overlay (search, filter, list rendering),
// random-challenge picker, and achievements panel.
// ============================================================

// ---- Question list / search / filter ----------------------------

function renderQuestionList() {
  const container = document.getElementById('question-list');
  container.innerHTML = '';
  filteredQuestions.forEach(q => {
    const solved     = progress.solvedIds.includes(q.id);
    const bookmarked = progress.bookmarks.includes(q.id);
    const item = document.createElement('div');
    item.className    = 'q-list-item' + (solved ? ' solved' : '');
    item.dataset.qid  = q.id;
    item.innerHTML = `
      <span class="q-list-status">${solved ? '✓' : '○'}</span>
      <span class="q-list-id">Q${q.id}</span>
      <span class="q-list-title">${escapeHtml(q.title)}</span>
      <span class="q-list-lib lib-${q.library}">${q.library}</span>
      ${bookmarked ? '<span class="q-list-bookmark">★</span>' : ''}
    `;
    item.onclick = () => { jumpToQuestion(q.id); closeBrowsePanel(); };
    container.appendChild(item);
  });
  highlightActiveInList();
}

function highlightActiveInList() {
  const q = getCurrentQuestion();
  document.querySelectorAll('.q-list-item').forEach(el => {
    el.classList.toggle('active', Number(el.dataset.qid) === q.id);
  });
}

/** Re-filters QUESTIONS and refreshes the list + loads question 0 of results */
function applyFilters() {
  const search         = document.getElementById('search-input').value.trim().toLowerCase();
  const lib            = document.getElementById('filter-library').value;
  const diff           = document.getElementById('filter-difficulty').value;
  const onlyBookmarked = document.getElementById('filter-bookmarked').checked;

  filteredQuestions = QUESTIONS.filter(q => {
    if (lib  !== 'all' && q.library    !== lib)  return false;
    if (diff !== 'all' && q.difficulty !== diff)  return false;
    if (onlyBookmarked && !progress.bookmarks.includes(q.id)) return false;
    if (search && !(
      q.title.toLowerCase().includes(search) ||
      q.description.toLowerCase().includes(search) ||
      String(q.id).includes(search)
    )) return false;
    return true;
  });

  // Fallback to full list if nothing matched
  if (!filteredQuestions.length) filteredQuestions = QUESTIONS.slice();
  renderQuestionList();
  loadQuestion(0);
}

// ---- Browse panel open / close ------------------------------------

function openBrowsePanel() {
  document.getElementById('browse-overlay').classList.add('open');
}
function closeBrowsePanel() {
  document.getElementById('browse-overlay').classList.remove('open');
}

function randomChallenge() {
  const idx = Math.floor(Math.random() * filteredQuestions.length);
  loadQuestion(idx);
  closeBrowsePanel();
}

// ---- Achievements panel -------------------------------------------

function showAchievementsPanel() {
  const list = document.getElementById('achievements-list');
  list.innerHTML = ACHIEVEMENTS.map(a => {
    const unlocked = progress.achievements.includes(a.id);
    return `
      <div class="ach-row ${unlocked ? 'unlocked' : ''}">
        <span class="ach-row-icon">${unlocked ? '🏆' : '🔒'}</span>
        <div>
          <div class="ach-row-name">${escapeHtml(a.name)}</div>
          <div class="ach-row-desc">${escapeHtml(a.desc)}</div>
        </div>
      </div>`;
  }).join('');
  document.getElementById('achievements-overlay').classList.add('open');
}
