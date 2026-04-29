# DMP Evaluation Service — Web UI

A [MkDocs Material](https://squidfunk.github.io/mkdocs-material/) documentation site that doubles as an interactive web UI for the [DMP Evaluation Service](https://github.com/OSTrails/DMP-Evaluation-Service). Users can upload a machine-actionable Data Management Plan (maDMP) file and evaluate it against a benchmark or an individual test directly in the browser. All logic is client-side JavaScript — there is no backend in this repository.

**Live site:** https://andresTabiTuwien.github.io/dmp_evaluation_service_web_site/

---

## Pages

| Page | File | Purpose |
|------|------|---------|
| Home | `docs/index.md` | Welcome + navigation guidance |
| Evaluate | `docs/evaluate.md` | Upload a maDMP and evaluate it against a benchmark or test |
| List of Entities | `docs/status.md` | Browse and filter available benchmarks, metrics, and tests |
| API | `docs/api.md` | Link to the Swagger UI |

---

## Local development

### Prerequisites

- Python 3.x
- pip

### Setup

```bash
python -m venv .venv

# Windows (PowerShell)
.\.venv\Scripts\Activate.ps1

# macOS / Linux
source .venv/bin/activate

pip install 'mkdocs-material>=9.5' pymdown-extensions
```

### Serve locally

```bash
mkdocs serve
```

The site is available at `http://127.0.0.1:8000`. By default it points to a local API at `http://localhost:8080`. Change `extra.api_base_url` in `mkdocs.yml` to target a different backend.

---

## API configuration

The API base URL is set at build time in `mkdocs.yml` (dev) or `mkdocs.prod.yml` (production) under `extra.api_base_url`. It is injected into a `<meta name="api-base-url">` tag by `overrides/main.html` and read at runtime by `docs/assets/javascripts/config.js`.

| Environment | API base URL |
|-------------|-------------|
| Dev (default) | `http://localhost:8080` |
| Production | `https://ostrails-dmp-evaluation.arisnet.ac.at` |

The following endpoints are exposed via `window.ENDPOINTS`:

| Key | Path |
|-----|------|
| `LIST_BENCHMARKS` | `/benchmarks/list` |
| `LIST_METRICS` | `/metrics/list` |
| `LIST_TESTS` | `/tests/info` |
| `ASSESS_BENCHMARK` | `/assess/benchmark` |
| `ASSESS_TEST` | `/assess/test` |

To add a new endpoint, extend `window.ENDPOINTS` in `docs/assets/javascripts/config.js`.

---

## Build & deploy

| Task | Command |
|------|---------|
| Serve locally (dev) | `mkdocs serve` |
| Build (dev) | `mkdocs build` |
| Build (production, strict) | `mkdocs build --strict -f mkdocs.prod.yml` |
| Deploy to GitHub Pages | `mkdocs gh-deploy --force` |
| Deploy production to GitHub Pages | `mkdocs gh-deploy --force -f mkdocs.prod.yml` |

### CI/CD

Pushing to `master` or `main` triggers `.github/workflows/ci.yml`, which automatically builds and deploys both the dev and production configurations to GitHub Pages.

---

## JavaScript module layout

All JS lives in `docs/assets/javascripts/` and is loaded via `mkdocs.yml` `extra_javascript`. Modules use plain global namespaces — no bundler required.

| Module | Exports |
|--------|---------|
| `config.js` | `window.API_BASE`, `window.ENDPOINTS` |
| `utils.js` | `escapeHtml()`, `handleResponse()` |
| `components.js` | `badge()`, `cardGrid()`, `dataTable()`, `attachToggle()` |
| `benchmarks.js` | `Benchmarks.populateSelect()`, `loadBenchmarks()`, `loadTests()` |
| `evaluate.js` | `Evaluate.setupBenchmarkForm()`, `Evaluate.setupTestForm()` |
| `status_lists.js` | `StatusLists.loadBenchmarksList()`, `loadMetricsList()`, `loadTestsList()` |
| `main.js` | DOMContentLoaded entry point — initialises page modules by checking for element presence |

---

## Theme customisation

`overrides/main.html` extends the MkDocs Material base template only to inject the API `<meta>` tag. For visual changes, prefer CSS custom properties in `docs/assets/stylesheets/extra.css` over modifying the template.
