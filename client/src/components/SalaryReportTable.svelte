<script>
  import SalaryRangeChart from "./SalaryRangeChart.svelte";
  import SalaryRangeBarChart from "./SalaryRangeBarChart.svelte";
  import SalaryRangeChartAxis from "./SalaryRangeChartAxis.svelte";
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
  min={0}
  max={4000}
  ticks={4}
  let:ticks={salaryChartTicks}
  let:lowerBound={salaryChartLowerBound}
  let:upperBound={salaryChartUpperBound}
  let:tickRange={salaryChartTickRange}>
  <div class="table-container">
    <table class="table">
      <thead>
        <tr>
          <th class="table-head-cell">Name</th>
          <th class="table-head-cell text-right">Median</th>
          <th class="table-head-cell min-column text-right">Min</th>
          <th class="table-head-cell max-column text-right">Max</th>
          <th class="table-head-cell chart-colum">
            <SalaryRangeChartAxis
              ticks={salaryChartTicks}
              lowerBound={salaryChartLowerBound}
              upperBound={salaryChartUpperBound}
              tickRange={salaryChartTickRange} />
          </th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td class="table-cell">Berlin</td>
          <td class="table-cell text-right">2700</td>
          <td class="table-cell min-column text-right">1000</td>
          <td class="table-cell max-column text-right">3500</td>
          <td class="table-cell chart-colum">
            <SalaryRangeBarChart
              lowerBound={salaryChartLowerBound}
              upperBound={salaryChartUpperBound}
              min={1000}
              max={3500}
              avarage={2700} />
          </td>
        </tr>
        <tr>
          <td class="table-cell">Munchen</td>
          <td class="table-cell text-right">3000</td>
          <td class="table-cell min-column text-right">1300</td>
          <td class="table-cell max-column text-right">3800</td>
          <td class="table-cell chart-colum">
            <SalaryRangeBarChart
              lowerBound={salaryChartLowerBound}
              upperBound={salaryChartUpperBound}
              min={1300}
              max={3800}
              avarage={3000} />
          </td>
        </tr>
        <tr>
          <td class="table-cell">Köln</td>
          <td class="table-cell text-right">1400</td>
          <td class="table-cell min-column text-right">800</td>
          <td class="table-cell max-column text-right">2000</td>
          <td class="table-cell chart-colum">
            <SalaryRangeBarChart
              lowerBound={salaryChartLowerBound}
              upperBound={salaryChartUpperBound}
              min={800}
              max={2000}
              avarage={1400} />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</SalaryRangeChart>
