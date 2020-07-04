<script>
  import SalaryRangeChart from "./SalaryRangeChart.svelte";
  import SalaryRangeBarChart from "./SalaryRangeBarChart.svelte";
  import SalaryRangeChartAxis from "./SalaryRangeChartAxis.svelte";

  export let name;
  export let min;
  export let max;
  export let median;
</script>

<article
  class="rounded overflow-hidden border border-gray-200 shadow-lg px-6 py-4">
  <dl>
    <dt class="visually-hidden">Name</dt>
    <dd class="headline-4">{name}</dd>

    <div class="flex">
      <div>
        <dt class="body-text-secondary">Median</dt>
        <dd class="body-text-normal">{median}</dd>
      </div>

      <div class="ml-6">
        <dt class="body-text-secondary">Min</dt>
        <dd class="body-text-normal">{min}</dd>
      </div>

      <div class="ml-6">
        <dt class="body-text-secondary">Max</dt>
        <dd class="body-text-normal">{max}</dd>
      </div>
    </div>
  </dl>

  <div class="mt-2">
    <SalaryRangeChart
      min={0}
      max={4000}
      ticks={4}
      let:ticks={salaryChartTicks}
      let:lowerBound={salaryChartLowerBound}
      let:upperBound={salaryChartUpperBound}
      let:tickRange={salaryChartTickRange}>
      <SalaryRangeBarChart
        lowerBound={salaryChartLowerBound}
        upperBound={salaryChartUpperBound}
        {min}
        {max}
        avarage={median} />
      <div class="mt-1">
        <SalaryRangeChartAxis
          ticks={salaryChartTicks}
          lowerBound={salaryChartLowerBound}
          upperBound={salaryChartUpperBound}
          tickRange={salaryChartTickRange} />
      </div>
    </SalaryRangeChart>
  </div>
</article>
