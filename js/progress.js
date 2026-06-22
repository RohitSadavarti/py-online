// ============================================================
// progress.js
// Tracks attempts, marks questions solved, fires achievements,
// and updates the header progress bar.
// ============================================================

function recordAttempt(qid, passed) {
  if (!progress.attempts[qid]) progress.attempts[qid] = { tries: 0, correct: 0 };
  progress.attempts[qid].tries  += 1;
  if (passed) progress.attempts[qid].correct += 1;
  saveProgress();
}

function markSolved(qid) {
  if (!progress.solvedIds.includes(qid)) {
    progress.solvedIds.push(qid);
    progress.recentlySolved = [qid, ...(progress.recentlySolved || [])].slice(0, 10);
    saveProgress();
    checkAchievements();
    updateProgressBar();
    renderQuestionList();
  }
}

function checkAchievements() {
  ACHIEVEMENTS.forEach(a => {
    if (!progress.achievements.includes(a.id) && a.test(progress)) {
      progress.achievements.push(a.id);
      saveProgress();
      showAchievementToast(a);
    }
  });
}

function showAchievementToast(a) {
  const toast = document.createElement('div');
  toast.className = 'achievement-toast';
  toast.innerHTML = `
    <div class="ach-icon">🏆</div>
    <div>
      <div class="ach-name">Achievement unlocked: ${escapeHtml(a.name)}</div>
      <div class="ach-desc">${escapeHtml(a.desc)}</div>
    </div>`;
  document.getElementById('toast-container').appendChild(toast);
  setTimeout(() => toast.classList.add('show'), 10);
  setTimeout(() => { toast.classList.remove('show'); setTimeout(() => toast.remove(), 400); }, 3800);
}

function updateProgressBar() {
  const total  = QUESTIONS.length;
  const solved = progress.solvedIds.length;
  const pct    = total ? Math.round((solved / total) * 100) : 0;
  document.getElementById('progress-fill').style.width   = pct + '%';
  document.getElementById('progress-label').textContent  = `${solved} / ${total} solved (${pct}%)`;

  let totalTries = 0, totalCorrect = 0;
  Object.values(progress.attempts).forEach(a => {
    totalTries   += a.tries;
    totalCorrect += a.correct;
  });
  const accuracy = totalTries ? Math.round((totalCorrect / totalTries) * 100) : 0;
  document.getElementById('accuracy-label').textContent = `Accuracy: ${accuracy}%`;
}
