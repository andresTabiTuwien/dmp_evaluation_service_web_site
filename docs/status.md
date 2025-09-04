# Service Status

Browse what the service exposes. Each tab fetches and lists items in a table.

=== "Benchmarks"
    <div class="tab-tools">
      <button id="toggle-benchmarks" class="md-button">Hide list</button>
      <span id="status-benchmarks-status" style="margin-left:.5rem;"></span>
    </div>
    <div id="status-benchmarks-grid" class="cards"></div>

=== "Metrics"
    <div class="tab-tools">
      <!-- <button id="metrics-view-toggle" class="md-button">View as cards</button>-->
      <span id="status-metrics-status" style="margin-left:.5rem;"></span>
    </div>
    <div id="metrics-table"></div>
    <div id="status-metrics-grid" class="cards" style="display:none;"></div> 

=== "Tests"
    <div class="tab-tools">
      <button id="toggle-tests" class="md-button">Show list</button>
      <span id="status-tests-status" style="margin-left:.5rem;"></span>
    </div>
    <div id="status-tests-grid" class="cards"></div>
