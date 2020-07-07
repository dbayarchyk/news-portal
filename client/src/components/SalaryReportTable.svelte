<script>
  import SalaryRangeChart from "./SalaryRangeChart.svelte";
  import SalaryRangeBarChart from "./SalaryRangeBarChart.svelte";
  import SalaryRangeChartAxis from "./SalaryRangeChartAxis.svelte";

  export let report = [];

  $: max = Math.max(...report.map(item => item.max)) || 0;
  $: min = Math.min(...report.map(item => item.min)) || 0;
</script>

<style>
  .min-column,
  .max-column {
    box-sizing: content-box;
    max-width: 8ch;
  }

  .chart-colum {
    width: 35em;
  }
</style>

<SalaryRangeChart
  {min}
  {max}
  ticks={4}
  let:lowerBound={salaryChartLowerBound}
  let:upperBound={salaryChartUpperBound}
  let:tickRange={salaryChartTickRange}>
  <div class="table-container">
    <table class="table">
      <thead>
        <tr>
          <th class="table-head-cell text-left">Name</th>
          <th class="table-head-cell text-right">Median</th>
          <th class="table-head-cell min-column text-right">Min</th>
          <th class="table-head-cell max-column text-right">Max</th>
          <th class="table-head-cell chart-colum">
            <SalaryRangeChartAxis
              lowerBound={salaryChartLowerBound}
              upperBound={salaryChartUpperBound}
              tickRange={salaryChartTickRange} />
          </th>
        </tr>
      </thead>

      <tbody>
        {#each report as item}
          <tr>
            <td class="table-cell text-left">{item.name}</td>
            <td class="table-cell text-right">{item.median}</td>
            <td class="table-cell min-column text-right">
              {item.lower_quartile}
            </td>
            <td class="table-cell min-column text-right">
              {item.upper_quartile}
            </td>
            <td class="table-cell chart-colum">
              <SalaryRangeBarChart
                lowerBound={salaryChartLowerBound}
                upperBound={salaryChartUpperBound}
                min={item.lower_quartile}
                max={item.upper_quartile}
                avarage={item.median} />
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</SalaryRangeChart>
