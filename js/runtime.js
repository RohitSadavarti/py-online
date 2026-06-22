// ============================================================
// runtime.js
// Pyodide Python runtime initialisation, package management,
// and chart-metadata extraction helpers.
//
// To upgrade Pyodide: update the indexURL version string in
// initPyodide() AND the <script src=...> tag in index.html.
// To add a new lazy-loaded library: add it to MICROPIP_PKGS
// in config.js and update the requiredLibs logic in runner.js.
// ============================================================

async function initPyodide() {
  setRunnerStatus('loading', 'Booting Python runtime…');
  try {
    pyodide = await loadPyodide({
      indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.27.2/full/',
    });
    setRunnerStatus('loading', 'Loading numpy, pandas, matplotlib…');
    await pyodide.loadPackage(CORE_PKGS);
    CORE_PKGS.forEach(p => loadedPkgs.add(p));
    // Force non-interactive backend so matplotlib never tries to open a window
    await pyodide.runPythonAsync(`import matplotlib\nmatplotlib.use('Agg')`);
    pyodideReady = true;
    setRunnerStatus('idle', 'Ready. Press Ctrl+Enter or click Run Code.');
  } catch (e) {
    console.error(e);
    setRunnerStatus(
      'error',
      'Could not load the Python runtime in this preview. ' +
      'Try downloading the HTML file and opening it directly in your browser.',
    );
  }
}

/**
 * Lazily installs additional packages via micropip.
 * Already-installed packages are skipped.
 * @param {string[]} libs - library names (keys into MICROPIP_PKGS)
 */
async function ensurePackages(libs) {
  const need = libs.filter(l => l !== 'matplotlib' && !loadedPkgs.has(l));
  if (!need.length) return;
  setRunnerStatus('loading', 'Installing ' + need.join(', ') + '…');
  await pyodide.loadPackage('micropip');
  const micropip = pyodide.pyimport('micropip');
  for (const lib of need) {
    const pkgName = MICROPIP_PKGS[lib] || lib;
    await micropip.install(pkgName);
    loadedPkgs.add(lib);
  }
}

// ---- Chart-metadata extraction -------------------------------------
// These helpers run Python inside Pyodide and return a plain JS object
// with chart metadata + either a base64 PNG or Plotly JSON.

/**
 * Inspects the current matplotlib figure and returns metadata + PNG.
 * Works for matplotlib and seaborn (both use plt / gcf()).
 */
async function extractMatplotlib() {
  const code = `
import matplotlib.pyplot as plt, base64, io, json
def __pv():
    fig = plt.gcf()
    axes = fig.get_axes()
    if not axes:
        return json.dumps({"error": "no chart was created (no matplotlib figure found)"})
    ax = axes[0]

    # Heuristic chart-type detection
    chart_type = "other"
    wedge_like = any(p.__class__.__name__ == "Wedge" for p in ax.patches)
    if wedge_like:
        chart_type = "pie"
    elif len(ax.lines) > 0 and len(ax.patches) == 0:
        chart_type = "line"
    elif len(ax.patches) > 0 and not wedge_like:
        chart_type = "bar"
    elif len(ax.collections) > 0:
        chart_type = "scatter"

    meta = {
        "chart_type": chart_type,
        "title":      ax.get_title() or (fig._suptitle.get_text() if fig._suptitle else ""),
        "xlabel":     ax.get_xlabel(),
        "ylabel":     ax.get_ylabel(),
        "has_legend": ax.get_legend() is not None,
        "num_axes":   len(axes),
    }

    buf = io.BytesIO()
    fig.savefig(buf, format='png', dpi=110, bbox_inches='tight', facecolor='white')
    buf.seek(0)
    meta["image"] = base64.b64encode(buf.read()).decode('utf-8')
    return json.dumps(meta)
__pv()
`;
  const resultStr = await pyodide.runPythonAsync(code);
  return JSON.parse(resultStr);
}

/**
 * Inspects a Plotly figure stored in the `fig` Python variable.
 * Returns metadata + fig.to_json() for client-side rendering with Plotly.js.
 */
async function extractPlotly() {
  const code = `
import json
def __pv():
    try:
        f = fig
    except NameError:
        return json.dumps({"error": "no variable named fig was found — store your chart in a variable called fig"})
    if f is None:
        return json.dumps({"error": "fig is None — assign your px./go. chart to fig"})

    title_obj   = f.layout.title
    title_text  = (title_obj.text or "") if title_obj is not None else ""
    xaxis_title = ""
    yaxis_title = ""
    try:
        if f.layout.xaxis and f.layout.xaxis.title:
            xaxis_title = f.layout.xaxis.title.text or ""
    except Exception:
        pass
    try:
        if f.layout.yaxis and f.layout.yaxis.title:
            yaxis_title = f.layout.yaxis.title.text or ""
    except Exception:
        pass

    types      = [t.type for t in f.data]
    has_legend = bool(f.layout.showlegend) if f.layout.showlegend is not None else (len(f.data) > 1)

    return json.dumps({
        "title":      title_text or "",
        "xlabel":     xaxis_title,
        "ylabel":     yaxis_title,
        "chart_type": types[0] if types else "other",
        "has_legend": has_legend,
        "num_axes":   1,
        "fig_json":   f.to_json(),
    })
__pv()
`;
  const resultStr = await pyodide.runPythonAsync(code);
  return JSON.parse(resultStr);
}

/** Strips Pyodide's internal traceback noise, keeping only the Python part */
function formatPyError(e) {
  const msg = (e && e.message) ? e.message : String(e);
  const idx = msg.indexOf('Traceback');
  return idx >= 0 ? msg.slice(idx) : msg;
}
