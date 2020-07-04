<script>
  export let lowerBound = 0;
  export let upperBound = 0;
  export let min = 0;
  export let max = 0;
  export let avarage = 0;

  $: boundRange = upperBound - lowerBound;
  $: range = max - min;
  $: rangeElWidth = `${(range / boundRange) * 100}%`;
  $: rangeElLeftShift = `${(min / boundRange) * 100}%`;
  $: salaryAvarageElLeftShift = `${((avarage - min) / range) * 100}%`;
</script>

<style>
  .salary-range {
    --bg-opacity: 0.5;
    padding-top: 0.5em;
    padding-bottom: 0.5em;
  }

  .salary-avarage {
    padding: 0.05em 0.125em;
    transform: translateX(-50%);
    line-height: 1;
  }

  .salary-avarage::before,
  .salary-avarage::after {
    content: "";
    background: #667eea;
    height: 100%;
    width: 2px;
    display: block;
    position: absolute;
    left: 50%;
  }

  .salary-range {
    font-size: 0.75rem;
  }

  .salary-avarage::before {
    top: 0;
    transform: translate(-50%, -35%);
  }

  .salary-avarage::after {
    bottom: 0;
    transform: translate(-50%, 35%);
  }
</style>

<div class="salary-range-chart w-full">
  <div
    class="salary-range flex bg-indigo-200 relative"
    style={`
      width: ${rangeElWidth};
      left: ${rangeElLeftShift};
    `}>
    <span
      class="salary-avarage inline-block relative bg-indigo-500 text-white
      font-semibold"
      style={`
        left: ${salaryAvarageElLeftShift};
      `}>
      <span class="relative z-10">{avarage}</span>
    </span>
  </div>
</div>
