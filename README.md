# PyViz Mastery Platform

A LeetCode-style interactive platform for practising Python data visualisation — Matplotlib, Seaborn, and Plotly — entirely in the browser using Pyodide (Python via WebAssembly).

---

## How to run

No build step needed. Just open `index.html` in any modern browser:

```
double-click index.html
# or
python -m http.server 8080   # then open http://localhost:8080
```

> **Note:** Pyodide loads packages from `cdn.jsdelivr.net`. This requires an internet connection on first load. Packages are cached by the browser after that.

---

## Project structure

```
pyviz-platform/
│
├── index.html              ← App shell + all <script> / <link> tags
│
├── css/
│   └── styles.css          ← All styles (dark/light themes, layout, components)
│
└── js/
    ├── questions.js        ← Question bank (add new questions here)
    ├── config.js           ← Constants, achievements, runtime state variables
    ├── storage.js          ← localStorage read/write (progress persistence)
    ├── theme.js            ← Dark / light theme toggle
    ├── runtime.js          ← Pyodide init, package loading, chart extraction
    ├── editor.js           ← Monaco editor setup + toolbar actions
    ├── runner.js           ← runCode() pipeline + validate()
    ├── navigation.js       ← Question nav + left-panel renderer
    ├── output.js           ← Right-panel output renderer
    ├── browse.js           ← Browse overlay, search/filter, achievements panel
    ├── progress.js         ← Attempt tracking, solved state, achievements
    └── main.js             ← Bootstrap (DOMContentLoaded) + event wiring
```

---

## How to add questions

Edit `js/questions.js`. Each question is an object in the `QUESTIONS` array:

```js
{
  id: 121,                          // unique number
  section: 1,                       // section number 1–8
  sectionTitle: 'Matplotlib Basics',
  library: 'matplotlib',            // 'matplotlib' | 'seaborn' | 'plotly'
  difficulty: 'Beginner',           // 'Beginner' | 'Intermediate' | 'Advanced'
  title: 'My New Chart',
  description: 'What the user should do.',
  learningObjective: 'Learn X.',
  expectedChartType: 'Line Chart',
  dataset: {
    columns: ['Month', 'Sales'],
    rows: [['Jan', 12000], ['Feb', 18000]],
  },
  hints: ['Hint 1', 'Hint 2', 'Hint 3'],
  starterCode: `import matplotlib.pyplot as plt\n# df is already loaded\n`,
  solution: `import matplotlib.pyplot as plt\nplt.plot(df['Month'], df['Sales'])\nplt.title('Sales')\nplt.show()\n`,
  expectedOutput: {
    type: 'line',       // chart_type value returned by the extractor
    title: 'Sales',     // substring match (case-insensitive)
    xlabel: 'Month',
    ylabel: 'Sales',
    legend: false,
  },
  validationRules: ['type', 'title', 'xlabel', 'ylabel'],
  // Available rules: 'type' | 'title' | 'xlabel' | 'ylabel' | 'legend' | 'minAxes'
  explanation: 'plt.plot() draws a line chart. Always add axis labels.',
}
```

---

## How to add a new validation rule

1. Add a new key to the question's `validationRules` array and `expectedOutput` object.
2. Open `js/runner.js` and add a matching block inside `validate()`:

```js
if (want('myRule')) {
  checks.push({
    label: `My rule description`,
    pass: /* your check against meta */,
  });
}
```

---

## How to add achievements

Open `js/config.js` and push a new object into `ACHIEVEMENTS`:

```js
{
  id: 'speed_runner',
  name: 'Speed Runner',
  desc: 'Solve 5 questions in a single session',
  test: p => p.recentlySolved.length >= 5,
}
```

---

## How to upgrade dependencies

| Dependency | Where to change |
|---|---|
| Monaco Editor | `index.html` `<script src=...>` + `js/editor.js` `require.config paths.vs` |
| Plotly.js | `index.html` `<script src=...>` |
| Pyodide | `index.html` `<script src=...>` + `js/runtime.js` `indexURL` |

Always test after upgrading — these libraries occasionally have breaking changes.

---

## Sections

| # | Title | Library |
|---|---|---|
| 1 | Matplotlib Basics | Matplotlib |
| 2 | Matplotlib Intermediate | Matplotlib |
| 3 | Seaborn Basics | Seaborn |
| 4 | Seaborn Advanced | Seaborn |
| 5 | Plotly Basics | Plotly |
| 6 | Plotly Advanced | Plotly |
| 7 | Formatting Challenges | Matplotlib |
| 8 | Real-World Projects | Mixed |
