// ============================================================
// storage.js
// Handles reading and writing progress to localStorage.
// Progress shape:
//   {
//     solvedIds:      number[],          // question ids solved
//     attempts:       { [qid]: { tries, correct } },
//     bookmarks:      number[],
//     notes:          { [qid]: string },
//     achievements:   string[],          // achievement ids unlocked
//     theme:          'dark' | 'light',
//     recentlySolved: number[],          // last 10 solved ids
//   }
// ============================================================

let progress = loadProgress();

function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return {
    solvedIds: [],
    attempts: {},
    bookmarks: [],
    notes: {},
    achievements: [],
    theme: 'dark',
    recentlySolved: [],
  };
}

function saveProgress() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {}
}
