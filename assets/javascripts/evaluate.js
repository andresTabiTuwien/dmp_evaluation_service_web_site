// evaluate.js

function setupBenchmarkForm() {
  const form = document.getElementById('form-evaluate-benchmark');
  if (!form) return;

  const statusEl = document.getElementById('evaluate-benchmark-status');
  const resultEl = document.getElementById('evaluate-benchmark-result');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    statusEl.textContent = 'Submitting…';
    resultEl.innerHTML = '';

    try {
      const fd = new FormData(form);

      const benchmark = fd.get('benchmark');
      const file = fd.get('maDMP');

      if (!benchmark) throw new Error('Please select a benchmark.');
      if (!file || !file.name) throw new Error('Please choose a maDMP file.');

      const resp = await fetch(window.ENDPOINTS.ASSESS_BENCHMARK, {
        method: 'POST',
        body: fd
      });

      await Utils.handleResponse(resp, statusEl, resultEl, renderEvaluateArray);
    } catch (err) {
      statusEl.innerHTML = `<span class="err">Error: ${err.message}</span>`;
    }
  });
}

function setupTestForm() {
  const form = document.getElementById('form-evaluate-test');
  if (!form) return;

  const statusEl = document.getElementById('evaluate-test-status');
  const resultEl = document.getElementById('evaluate-test-result');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    statusEl.textContent = 'Submitting…';
    resultEl.innerHTML = '';

    try {
      const fd = new FormData(form);

      const test = fd.get('test');
      const file = fd.get('maDMP');

      if (!test) throw new Error('Please select a test.');
      if (!file || !file.name) throw new Error('Please choose a maDMP file.');

      const resp = await fetch(window.ENDPOINTS.ASSESS_TEST, {
        method: 'POST',
        body: fd
      });

      await Utils.handleResponse(resp, statusEl, resultEl, renderEvaluateArray);
    } catch (err) {
      statusEl.innerHTML = `<span class="err">Error: ${err.message}</span>`;
    }
  });
}

/**
 * Pretty renderer when the API returns a List<Evaluation>.
 * If your test/benchmark endpoints return slightly different shapes,
 * this renderer will still show something useful.
 */
function renderEvaluateArray(data) {
  const wrap = document.createElement('div');
  wrap.className = 'cards';

  var arr = Array.isArray(data) ? data : (data?.results || [data]);
  if (!Array.isArray(arr) || arr.length === 0 || data === null) {
    const empty = document.createElement('div');
    empty.className = 'card';
    empty.innerHTML = `<h3>Results</h3><p>No evaluations returned.</p>`;
    wrap.appendChild(empty);
    return wrap;
  }

  arr.forEach((ev, idx) => {
    const card = document.createElement('div');
    card.className = 'card';

    const pieces = [];
    if (ev.id !== undefined) pieces.push(`<p><strong>ID:</strong> ${Utils.escapeHtml(String(ev.id))}</p>`);
    if (ev.rule || ev.test || ev.benchmark) {
      const label = ev.rule ? 'Rule' : (ev.test ? 'Test' : 'Benchmark');
      const value = ev.rule ?? ev.test ?? ev.benchmark;
      pieces.push(`<p><strong>${label}:</strong> ${Utils.escapeHtml(String(value))}</p>`);
    }
    if (ev.score !== undefined) pieces.push(`<p><strong>Score:</strong> ${ev.score}</p>`);
    if (ev.grade !== undefined) pieces.push(`<p><strong>Grade:</strong> ${Utils.escapeHtml(String(ev.grade))}</p>`);
    if (ev.summary) pieces.push(`<p><strong>Summary:</strong> ${Utils.escapeHtml(String(ev.summary))}</p>`);

    let issuesBlock = '';
    if (Array.isArray(ev.issues) && ev.issues.length) {
      const items = ev.issues.map(issue => {
        const sec = issue.section ? `<em>${Utils.escapeHtml(issue.section)}</em>` : 'General';
        const sev = issue.severity ? `<strong>[${Utils.escapeHtml(issue.severity)}]</strong>` : '';
        const msg = issue.message ? Utils.escapeHtml(issue.message) : '';
        return `<li>${sev} ${sec}: ${msg}</li>`;
      }).join('');
      issuesBlock = `<div><h4>Issues</h4><ul>${items}</ul></div>`;
    }

    if (pieces.length === 0 && !issuesBlock) {
      pieces.push(`<pre><code class="language-json">${Utils.escapeHtml(JSON.stringify(ev, null, 2))}</code></pre>`);
    }

    card.innerHTML = `<h3>Evaluation ${idx + 1}</h3>` + pieces.join('') + issuesBlock;
    wrap.appendChild(card);
  });

  return wrap;
}

window.Evaluate = { setupBenchmarkForm, setupTestForm };
