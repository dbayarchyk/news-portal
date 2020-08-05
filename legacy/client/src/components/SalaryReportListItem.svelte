<script>
  import SalaryRangeChart from "./SalaryRangeChart.svelte";
  import SalaryRangeBarChart from "./SalaryRangeBarChart.svelte";
  import SalaryRangeChartAxis from "./SalaryRangeChartAxis.svelte";

  export let name;
  export let lowerBound;
  export let upperBound;
  export let min;
  export let max;
  export let median;
  export let count;
</script>

<article
  class="rounded overflow-hidden border border-gray-200 shadow-lg px-6 py-4">
  <dl>
    <dt class="visually-hidden">Name</dt>
    <dd>
      <span class="headline headline-4">{name}</span>
      <span class="body-text body-text-secondary ml-2">📄 {count}</span>
    </dd>

    <div class="flex">
      <div>
        <dt class="body-text body-text-secondary">Median</dt>
        <dd class="body-text body-text-normal">{median}</dd>
      </div>

      <div class="ml-6">
        <dt class="body-text body-text-secondary">Min</dt>
        <dd class="body-text body-text-normal">{min}</dd>
      </div>

      <div class="ml-6">
        <dt class="body-text body-text-secondary">Max</dt>
        <dd class="body-text body-text-normal">{max}</dd>
      </div>
    </div>
  </dl>

  <div class="mt-2">
    <SalaryRangeChart
      min={lowerBound}
      max={upperBound}
      ticks={2}
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
          lowerBound={salaryChartLowerBound}
          upperBound={salaryChartUpperBound}
          tickRange={salaryChartTickRange} />
      </div>
    </SalaryRangeChart>
  </div>
</article>
