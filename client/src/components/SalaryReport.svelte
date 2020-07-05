<script>
  import SalaryReportTable from "./SalaryReportTable.svelte";
  import SalaryReportList from "./SalaryReportList.svelte";
  import SalaryReportNoData from "./SalaryReportNoData.svelte";
  import SalaryReportMissingDataBox from "./SalaryReportMissingDataBox.svelte";

  export let report;
</script>

{#if Array.isArray(report) && report.length > 0}
  <div class="hidden sm:block">
    <SalaryReportTable {report} />
  </div>

  <div class="block sm:hidden">
    <SalaryReportList {report} />
  </div>

  <div class="mt-8">
    <SalaryReportMissingDataBox />
  </div>
{:else}
  <SalaryReportNoData />
{/if}
