// ============================================================
// config.js
// Global constants, achievement definitions, and app state.
// To add new achievements: push a new object into ACHIEVEMENTS.
// To add new Python packages: add to CORE_PKGS or MICROPIP_PKGS.
// ============================================================

// Packages loaded once at startup via pyodide.loadPackage()
const CORE_PKGS = ['numpy', 'matplotlib', 'pandas'];

// Packages loaded on-demand via micropip when a question needs them
const MICROPIP_PKGS = { seaborn: 'seaborn', plotly: 'plotly' };

// LocalStorage key — bump the version suffix if the schema changes
const STORAGE_KEY = 'pyviz_progress_v1';

// ---- Achievement definitions ----------------------------------------
// Each entry: { id, name, desc, test(progress) → boolean }
const ACHIEVEMENTS = [
  {
    id: 'first_chart',
    name: 'First Chart',
    desc: 'Solve your first question',
    test: p => p.solvedIds.length >= 1,
  },
  {
    id: 'ten_charts',
    name: '10 Charts Solved',
    desc: 'Solve 10 questions',
    test: p => p.solvedIds.length >= 10,
  },
  {
    id: 'all_charts',
    name: 'Chart Grandmaster',
    desc: 'Solve every question on the platform',
    test: p => p.solvedIds.length >= QUESTIONS.length,
  },
  {
    id: 'matplotlib_master',
    name: 'Matplotlib Master',
    desc: 'Solve every Matplotlib question',
    test: p => libDone(p, 'matplotlib'),
  },
  {
    id: 'seaborn_master',
    name: 'Seaborn Master',
    desc: 'Solve every Seaborn question',
    test: p => libDone(p, 'seaborn'),
  },
  {
    id: 'plotly_master',
    name: 'Plotly Master',
    desc: 'Solve every Plotly question',
    test: p => libDone(p, 'plotly'),
  },
  {
    id: 'viz_expert',
    name: 'Visualization Expert',
    desc: 'Solve at least 1 question from every section',
    test: p => {
      const sections = new Set(QUESTIONS.map(q => q.section));
      const solved = new Set(QUESTIONS.filter(q => p.solvedIds.includes(q.id)).map(q => q.section));
      return [...sections].every(s => solved.has(s));
    },
  },
];

/** Returns true when every question in a library has been solved */
function libDone(progress, lib) {
  return QUESTIONS.filter(q => q.library === lib).every(q => progress.solvedIds.includes(q.id));
}

// ---- Runtime state (mutable, not persisted) -------------------------
let currentIndex = 0;
let filteredQuestions = [];          // populated after QUESTIONS loads
let monacoEditor = null;
let pyodide = null;
let pyodideReady = false;
const loadedPkgs = new Set();        // tracks which packages are already installed
let hintsRevealed = 0;
let lastRunPassed = false;
