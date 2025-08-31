// main.js
document.addEventListener('DOMContentLoaded', () => {
   // Evaluate page hooks 
  if (document.getElementById('benchmark-select')) Benchmarks.loadBenchmarks();
  if (document.getElementById('test-select')) Benchmarks.loadTests?.();
  if (document.getElementById('form-evaluate-benchmark')) Evaluate.setupBenchmarkForm();
  if (document.getElementById('form-evaluate-test')) Evaluate.setupTestForm?.();

   // Status page loaders 
  if (document.getElementById('status-benchmarks-grid')) StatusLists.loadBenchmarksList();
  if (document.getElementById('status-metrics-grid'))    StatusLists.loadMetricsList();
  if (document.getElementById('status-tests-grid'))      StatusLists.loadTestsList();


  
  // load benchmarks (if dropdown exists)
  //Benchmarks.loadBenchmarks();
  //Benchmarks.loadTests();

  // setup forms
  //Evaluate.setupBenchmarkForm();
  //Evaluate.setupTestForm();

});
