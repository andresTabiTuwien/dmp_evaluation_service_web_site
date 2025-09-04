// status_lists.js  — collapsible tabs + expandable cards
const { cardGrid, dataTable } = window.Components;

/* ---------- small utils ---------- */
function escapeHtml(s) {
  return String(s)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}
function isUrl(v) { return typeof v === 'string' && /^https?:\/\//i.test(v); }
function linkOrCode(v) { const s = String(v || ''); return isUrl(s) ? `<a href="${escapeHtml(s)}" target="_blank" rel="noopener">${escapeHtml(s)}</a>` : `<code>${escapeHtml(s)}</code>`; }
function badge(text, variant = 'muted') { const cls = variant === 'ok' ? 'badge--ok' : (variant === 'warn' ? 'badge--warn' : 'badge--muted'); return `<span class="badge ${cls}">${escapeHtml(String(text))}</span>`; }
function chips(title, items) { if (!Array.isArray(items) || !items.length) return ''; const chipsHtml = items.map(v => `<span class="chip">${linkOrCode(v)}</span>`).join(''); return `<div><strong>${escapeHtml(title)}:</strong><div class="chips">${chipsHtml}</div></div>`; }

function attachCardToggle(card) {
  const toggle = () => card.classList.toggle('open');
  card.addEventListener('click', (e) => {
    // avoid toggling when clicking links
    if (e.target.closest('a')) return;
    toggle();
  });
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
  });
}

/* ---------- renderers (header minimal; body detailed) ---------- */
function renderBenchmarks(list, gridEl) {
  gridEl.innerHTML = '';
  if (!Array.isArray(list) || !list.length) {
    gridEl.innerHTML = `<div class="card"><h3>Benchmarks</h3><p>No benchmarks found.</p></div>`;
    return;
  }
  list.forEach(b => {
    const title = b.title || 'Untitled benchmark';
    const id = b.benchmarkId || '';
    const versionBadg = b.version ? badge(`v${b.version}`, 'muted') : '';
    const statusBadg = b.status ? badge(b.status, String(b.status).toUpperCase() === 'ACTIVE' ? 'ok' : 'warn') : '';

    const card = document.createElement('div');
    card.className = 'card clickable';
    card.tabIndex = 0;
    card.innerHTML = `
      <div class="card-header">
        <div>
          <h3 class="card-title">${escapeHtml(title)}</h3>
          <p class="card-meta"><strong>ID:</strong> <code>${escapeHtml(id)}</code> ${versionBadg} ${statusBadg}</p>
        </div>
        <div class="card-caret">▾</div>
      </div>
      <div class="card-body">
        ${b.description ? `<p>${escapeHtml(b.description)}</p>` : ''}
        ${chips('Algorithms', b.algorithms)}
        ${chips('Associated metrics', b.hasAssociatedMetric)}
        ${b.landingPage ? `<p><strong>Landing:</strong> ${linkOrCode(b.landingPage)}</p>` : ''}
        <details><summary>Raw</summary>
          <pre><code class="language-json">${escapeHtml(JSON.stringify(b, null, 2))}</code></pre>
        </details>
      </div>
    `;
    attachCardToggle(card);
    gridEl.appendChild(card);
  });
}

function renderMetrics(list, gridEl) {
  gridEl.innerHTML = '';
  if (!Array.isArray(list) || !list.length) {
    gridEl.innerHTML = `<div class="card"><h3>Metrics</h3><p>No metrics found.</p></div>`;
    return;
  }
  list.forEach(m => {
    const title = m.title || 'Untitled metric';
    const id = m.id || '';
    const versionBadg = m.version ? badge(`v${m.version}`, 'muted') : '';
    const statusBadg = m.status ? badge(m.status, String(m.status).toUpperCase() === 'ACTIVE' ? 'ok' : 'warn') : '';

    const card = document.createElement('div');
    card.className = 'card clickable';
    card.tabIndex = 0;
    card.innerHTML = `
      <div class="card-header">
        <div>
          <h3 class="card-title">${escapeHtml(title)}</h3>
          <p class="card-meta"><strong>ID:</strong> <code>${escapeHtml(id)}</code> ${versionBadg} ${statusBadg}</p>
        </div>
        <div class="card-caret">▾</div>
      </div>
      <div class="card-body">
        ${m.description ? `<p>${escapeHtml(m.description)}</p>` : ''}
        ${chips('Tests', m.testAssociated)}
        ${chips('Benchmarks', m.hasBenchmark)}
        ${m.landingPage ? `<p><strong>Landing:</strong> ${linkOrCode(m.landingPage)}</p>` : ''}
        <details><summary>Raw</summary>
          <pre><code class="language-json">${escapeHtml(JSON.stringify(m, null, 2))}</code></pre>
        </details>
      </div>
    `;
    attachCardToggle(card);
    gridEl.appendChild(card);
  });
}

function renderTests(list, gridEl) {
  gridEl.innerHTML = '';
  if (!Array.isArray(list) || !list.length) {
    gridEl.innerHTML = `<div class="card"><h3>Tests</h3><p>No tests found.</p></div>`;
    return;
  }
  list.forEach(t => {
    const title = t.title || 'Untitled test';
    const id = t.id || '';
    const versionBadg = t.version ? badge(`v${t.version}`, 'muted') : '';
    const licenseBadg = t.license ? badge(t.license, 'muted') : '';
    const typeBadg = t.type ? badge(t.type, 'ok') : '';

    const card = document.createElement('div');
    card.className = 'card clickable';
    card.tabIndex = 0;
    card.innerHTML = `
      <div class="card-header">
        <div>
          <h3 class="card-title">${escapeHtml(title)}</h3>
          <p class="card-meta"><strong>ID:</strong> <code>${escapeHtml(id)}</code> ${versionBadg} ${licenseBadg} ${typeBadg}</p>
        </div>
        <div class="card-caret">▾</div>
      </div>
      <div class="card-body">
        ${t.description ? `<p>${escapeHtml(t.description)}</p>` : ''}
        ${t.endpointURL ? `<p><strong>Endpoint:</strong> ${linkOrCode(t.endpointURL)}</p>` : ''}
        ${t.repository ? `<p><strong>Repository:</strong> ${linkOrCode(t.repository)}</p>` : ''}
        ${t.theme ? `<p><strong>Theme:</strong> ${escapeHtml(t.theme)}</p>` : ''}
        ${t.keyword ? `<p><strong>Keyword:</strong> ${escapeHtml(t.keyword)}</p>` : ''}
        ${(t.evaluator || t.functionEvaluator) ? `<p><strong>Evaluator:</strong> ${escapeHtml(t.evaluator || '')} ${t.functionEvaluator ? ` — <code>${escapeHtml(t.functionEvaluator)}</code>` : ''}</p>` : ''}
        ${t.metricImplemented ? `<p><strong>Metric implemented:</strong> <code>${escapeHtml(t.metricImplemented)}</code></p>` : ''}
        <details><summary>Raw</summary>
          <pre><code class="language-json">${escapeHtml(JSON.stringify(t, null, 2))}</code></pre>
        </details>
      </div>
    `;
    attachCardToggle(card);
    gridEl.appendChild(card);
  });
}

/* ---------- fetch & loaders ---------- */
async function fetchList(url) {
  const resp = await fetch(url);
  if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
  const data = await resp.json();
  return Array.isArray(data) ? data : (data.items || data.results || []);
}

async function loadBenchmarksList() {
  const statusEl = document.getElementById('status-benchmarks-status');
  const gridEl = document.getElementById('status-benchmarks-grid');
  const tableEl = document.getElementById('benchmarks-table');    
  if (!tableEl) return;
  try {
    statusEl.textContent = 'Loading benchmarks…';
    const list = await fetchList(window.ENDPOINTS.LIST_BENCHMARKS);

    // Build the table
    const { dataTable, escapeHtml, badge } = window.Components;

    dataTable(tableEl, list, [
      {
        key: 'title',
        title: 'Title',
        sortable: true,
        value: (m) => escapeHtml(m.title || '')
      },
      {
        key: 'version',
        title: 'Version',
        sortable: true,
        value: (m) => escapeHtml(m.version || '')
      },
      {
        key: 'status',
        title: 'Status',
        sortable: true,
        value: (m) => m.status
          ? badge(m.status, String(m.status).toUpperCase() === 'ACTIVE' ? 'ok' : 'warn')
          : ''
      },
      {
        key: 'description',
        title: 'Description',
        sortable: false,
        value: (m) => m.description
          ? `<div class="wrap-text">${escapeHtml(m.description)}</div>`
          : ''
      }
    ], {
      searchable: true,
      paginated: true,
      pageSize: 10
    });

    statusEl.textContent = `Found ${list.length} metric(s).`;
  } catch (err) {
    statusEl.innerHTML = `<span class="err">Error: ${escapeHtml(err.message)}</span>`;
  }
}

async function loadMetricsList() {
  const statusEl = document.getElementById('status-metrics-status');
  const gridEl = document.getElementById('status-metrics-grid');   // optional/unused
  const tableEl = document.getElementById('metrics-table');         // 👈 new
  if (!tableEl) return;

  try {
    statusEl.textContent = 'Loading metrics…';
    const resp = await fetch(window.ENDPOINTS.LIST_METRICS);
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    const data = await resp.json();
    const list = Array.isArray(data) ? data : (data.items || data.results || []);

    // Build the table
    const { dataTable, escapeHtml, badge } = window.Components;

    dataTable(tableEl, list, [
      {
        key: 'title',
        title: 'Title',
        sortable: true,
        value: (m) => escapeHtml(m.title || '')
      },
      {
        key: 'version',
        title: 'Version',
        sortable: true,
        value: (m) => escapeHtml(m.version || '')
      },
      {
        key: 'status',
        title: 'Status',
        sortable: true,
        value: (m) => m.status
          ? badge(m.status, String(m.status).toUpperCase() === 'ACTIVE' ? 'ok' : 'warn')
          : ''
      },
      {
        key: 'description',
        title: 'Description',
        sortable: false,
        value: (m) => m.description
          ? `<div class="wrap-text">${escapeHtml(m.description)}</div>`
          : ''
      }
    ], {
      searchable: true,
      paginated: true,
      pageSize: 10
    });

    statusEl.textContent = `Found ${list.length} metric(s).`;

    // If you kept the old cards grid in the HTML, make sure it stays hidden:
    //if (gridEl) gridEl.style.display = 'none';

    /*
    const toggleBtn = document.getElementById('metrics-view-toggle');
    if (toggleBtn && gridEl) {
      let mode = 'table'; // or 'cards'
      toggleBtn.addEventListener('click', () => {
        if (mode === 'table') {
          // render cards into gridEl using your existing renderMetrics(list, gridEl)
          renderMetrics(list, gridEl);
          gridEl.style.display = '';
          tableEl.style.display = 'none';
          toggleBtn.textContent = 'View as table';
          mode = 'cards';
        } else {
          tableEl.style.display = '';
          gridEl.style.display = 'none';
          toggleBtn.textContent = 'View as cards';
          mode = 'table';
        }
      });
    }*/
  } catch (err) {
    statusEl.innerHTML = `<span class="err">Error: ${window.Components.escapeHtml(err.message)}</span>`;
  }
}

async function loadTestsList() {
  const statusEl = document.getElementById('status-tests-status');
  const gridEl = document.getElementById('status-tests-grid');
  const tableEl = document.getElementById('tests-table'); 
  if (!tableEl) return;
  try {
    statusEl.textContent = 'Loading tests…';
    const list = await fetchList(window.ENDPOINTS.LIST_TESTS);
    console.log("the list of tests:", list)
    // Build the table
    const { dataTable, escapeHtml, badge } = window.Components;

    dataTable(tableEl, list, [
      {
        key: 'title',
        title: 'Title',
        sortable: true,
        value: (m) => escapeHtml(m.title || '')
      },
      {
        key: 'version',
        title: 'Version',
        sortable: true,
        value: (m) => escapeHtml(m.version || '')
      },
      {
        key: 'status',
        title: 'Status',
        sortable: true,
        value: (m) => m.status
          ? badge(m.status, String(m.status).toUpperCase() === 'ACTIVE' ? 'ok' : 'warn')
          : ''
      },
      {
        key: 'description',
        title: 'Description',
        sortable: false,
        value: (m) => m.description
          ? `<div class="wrap-text">${escapeHtml(m.description)}</div>`
          : ''
      }
    ], {
      searchable: true,
      paginated: true,
      pageSize: 10
    });
    /*renderTests(list, gridEl);
    statusEl.textContent = `Found ${list.length} test(s).`;
    setupTabToggle('toggle-tests', 'status-tests-grid');*/
  } catch (err) {
    statusEl.innerHTML = `<span class="err">Error: ${escapeHtml(err.message)}</span>`;
  }
}

/* ---------- tab show/hide toggle ---------- */
function setupTabToggle(buttonId, gridId) {
  const btn = document.getElementById(buttonId);
  const grid = document.getElementById(gridId);
  if (!btn || !grid) return;
  const update = () => { btn.textContent = grid.style.display === 'none' ? 'Show list' : 'Hide list'; };
  btn.addEventListener('click', () => {
    grid.style.display = (grid.style.display === 'none' ? '' : 'none');
    update();
  });
  update();
}

window.StatusLists = { loadBenchmarksList, loadMetricsList, loadTestsList };
