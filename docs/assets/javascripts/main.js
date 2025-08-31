// main.js
document.addEventListener('DOMContentLoaded', () => {
  // load benchmarks (if dropdown exists)
  Benchmarks.loadBenchmarks();
  Benchmarks.loadTests();

  // setup forms
  Evaluate.setupBenchmarkForm();
  Evaluate.setupTestForm();

  Health.setupHealthForm();
});
