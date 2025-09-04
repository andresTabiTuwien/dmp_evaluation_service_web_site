// utils.js
function escapeHtml(s) {
  return String(s)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

async function handleResponse(resp, statusEl, resultEl, prettyRenderer) {
  if (!resp.ok) {
    const t = await resp.text();
    throw new Error(`HTTP ${resp.status}: ${t}`);
  }
  const data = await resp.json();
  statusEl.innerHTML = '<span class="ok">Done ✔</span>';

  if (prettyRenderer) {
    const pretty = prettyRenderer(data);
    if (pretty) resultEl.appendChild(pretty);
  }

  const pre = document.createElement('pre');
  const code = document.createElement('code');
  code.className = 'language-json';
  code.textContent = JSON.stringify(data, null, 2);
  pre.appendChild(code);
  resultEl.appendChild(pre);

  return data;
}

window.Utils = { escapeHtml, handleResponse };
