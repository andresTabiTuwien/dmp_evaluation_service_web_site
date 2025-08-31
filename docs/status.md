# Service Status

# Service Status

Quick check to see if the service is reachable.
It calls: `{{ config.extra.api_base_url }}/benchmarks/list` and shows a summary.

<form id="form-health">
  <button class="md-button md-button--primary" type="submit">Check health</button>
</form>

<div id="health-status" style="margin-top:1rem;"></div>
<div id="health-result" style="margin-top:1rem;"></div>
