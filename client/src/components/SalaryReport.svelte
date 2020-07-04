<script>
  import SalaryReportTable from './SalaryReportTable.svelte';
  import SalaryReportList from './SalaryReportList.svelte';
</script>

<div class="hidden sm:block">
  <SalaryReportTable />
</div>

<div class="block sm:hidden">
  <SalaryReportList />
</div>