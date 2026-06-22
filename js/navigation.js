// ============================================================
// navigation.js
// Question navigation + left-panel UI rendering.
// Covers: loadQuestion, nextQuestion, jumpToQuestion,
//         renderLeftPanel, hint reveal, bookmarks, notes.
// ============================================================

function getCurrentQuestion() {
  return filteredQuestions[currentIndex];
}

function loadQuestion(idx) {
  currentIndex = idx;
  hintsRevealed = 0;
  lastRunPassed = progress.solvedIds.includes(getCurrentQuestion().id);
  renderLeftPanel();
  renderOutputIdle();
  if (monacoEditor) monacoEditor.setValue(getCurrentQuestion().starterCode);
  highlightActiveInList();
}

function nextQuestion() {
  if (currentIndex < filteredQuestions.length - 1) loadQuestion(currentIndex + 1);
}

function jumpToQuestion(qid) {
  const idx = filteredQuestions.findIndex(q => q.id === qid);
  if (idx >= 0) loadQuestion(idx);
}

// ---- Left-panel renderer -------------------------------------------

function renderLeftPanel() {
  const q        = getCurrentQuestion();
  const solved   = progress.solvedIds.includes(q.id);
  const bookmarked = progress.bookmarks.includes(q.id);

  document.getElementById('q-section').textContent      = `Section ${q.section} · ${q.sectionTitle}`;
  document.getElementById('q-number').textContent       = `Q${q.id}`;
  document.getElementById('q-difficulty').textContent   = q.difficulty;
  document.getElementById('q-difficulty').className     = 'badge diff-' + q.difficulty.toLowerCase();
  document.getElementById('q-library').textContent      = q.library;
  document.getElementById('q-library').className        = 'badge lib-' + q.library;
  document.getElementById('q-title').textContent        = q.title;
  document.getElementById('q-desc').textContent         = q.description;
  document.getElementById('q-objective').textContent    = q.learningObjective;
  document.getElementById('q-expected-type').textContent = q.expectedChartType;
  document.getElementById('solved-badge').style.display = solved ? 'inline-flex' : 'none';
  document.getElementById('bookmark-btn').textContent   = bookmarked ? '★ Bookmarked' : '☆ Bookmark';
  document.getElementById('bookmark-btn').classList.toggle('active', bookmarked);

  // Dataset table (max 8 rows shown)
  const table = document.getElementById('dataset-table');
  let html = '<thead><tr>' +
    q.dataset.columns.map(c => `<th>${escapeHtml(c)}</th>`).join('') +
    '</tr></thead><tbody>';
  q.dataset.rows.slice(0, 8).forEach(row => {
    html += '<tr>' + row.map(v => `<td>${escapeHtml(String(v))}</td>`).join('') + '</tr>';
  });
  html += '</tbody>';
  table.innerHTML = html;
  document.getElementById('dataset-note').textContent = q.dataset.rows.length > 8
    ? `Showing 8 of ${q.dataset.rows.length} rows — full dataset is loaded into df.`
    : `All ${q.dataset.rows.length} rows are loaded into df.`;

  // Hints
  const hintsEl = document.getElementById('hints-list');
  hintsEl.innerHTML = '';
  q.hints.forEach((h, i) => {
    const li = document.createElement('li');
    li.className = 'hint-item';
    li.id = 'hint-' + i;
    li.innerHTML = i < hintsRevealed
      ? escapeHtml(h)
      : `<span class="hint-locked">Hint ${i + 1} (click to reveal)</span>`;
    li.onclick = () => revealHint(i);
    hintsEl.appendChild(li);
  });

  // Notes
  document.getElementById('notes-area').value = progress.notes[q.id] || '';

  // Next button — locked until the question is solved
  const nextBtn = document.getElementById('next-btn');
  nextBtn.disabled = !solved;
  nextBtn.title = solved ? 'Go to the next question' : 'Solve this question to unlock Next';

  document.getElementById('q-position').textContent = `${currentIndex + 1} / ${filteredQuestions.length}`;
}

// ---- Hint / bookmark / note actions --------------------------------

function revealHint(i) {
  if (i < hintsRevealed) return;
  hintsRevealed = i + 1;
  renderLeftPanel();
}

function toggleBookmark() {
  const q = getCurrentQuestion();
  const i = progress.bookmarks.indexOf(q.id);
  if (i >= 0) progress.bookmarks.splice(i, 1);
  else progress.bookmarks.push(q.id);
  saveProgress();
  renderLeftPanel();
}

function saveNote() {
  const q = getCurrentQuestion();
  progress.notes[q.id] = document.getElementById('notes-area').value;
  saveProgress();
}
