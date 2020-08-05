<script>
  import SalaryReportListItem from "./SalaryReportListItem.svelte";

  export let report = [];

  $: lowerBound = Math.min(...report.map(item => item.min)) || 0;
  $: upperBound = Math.max(...report.map(item => item.max)) || 0;
</script>

<ul>
  {#each report as item}
    <li>
      <SalaryReportListItem
        name={item.name}
        {lowerBound}
        {upperBound}
        min={item.lower_quartile}
        max={item.upper_quartile}
        median={item.median}
        count={item.count} />
    </li>
  {/each}
</ul>
