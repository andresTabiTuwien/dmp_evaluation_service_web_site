// config.js
const meta = document.querySelector('meta[name="api-base-url"]');
window.API_BASE = meta ? meta.getAttribute("content") : "http://localhost:8080";

window.ENDPOINTS = {
  LIST_BENCHMARKS: `${window.API_BASE}/benchmarks/list`,
  ASSESS_BENCHMARK: `${window.API_BASE}/assess/benchmark`,
  LIST_TESTS: `${window.API_BASE}/tests/info`,
  ASSESS_TEST: `${window.API_BASE}/assess/test`
  // HEALTH: `${window.API_BASE}/api/health` // optional
};
