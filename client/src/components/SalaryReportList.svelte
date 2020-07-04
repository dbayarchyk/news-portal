<script>
  import SalaryReportListItem from "./SalaryReportListItem.svelte";
</script>

<ul>
  <li>
    <SalaryReportListItem name="Berlin" min={1000} max={3500} median={2700} />
  </li>

  <li class="mt-6">
    <SalaryReportListItem name="Munchen" min={1300} max={3800} median={3000} />
  </li>

  <li class="mt-6">
    <SalaryReportListItem name="Köln" min={800} max={2000} median={1400} />
  </li>
</ul>
