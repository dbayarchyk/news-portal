<script>
  export let lowerBound = 0;
  export let upperBound = 0;
  export let tickRange = 0;

  function getLabels(start, end, step) {
    if (!step) {
      return [];
    }

    const labels = [];

    for (let label = lowerBound; label <= upperBound; label += step) {
      labels.push(label);
    }

    return labels;
  }

  $: labels = getLabels(lowerBound, upperBound, tickRange);
</script>

<style>
  .salary-range-value {
    display: block;
  }

  .salary-range-value:not(:first-child) {
    position: absolute;
  }

  .salary-range-value:not(:first-child):not(:last-child) {
    transform: translateX(50%);
  }

  .salary-range-value::after {
    content: "";
    background: #a0aec0;
    height: 4px;
    width: 2px;
    display: block;
    position: absolute;
    bottom: 0;
  }

  .salary-range-value:not(:first-child):not(:last-child)::after {
    left: 50%;
    transform: translateX(-50%);
  }

  .salary-range-value:first-child::after {
    left: 0;
  }

  .salary-range-value:last-child::after {
    right: 0;
  }
</style>

<div class="flex relative border-b-2 border-gray-500">
  {#each labels as label, labelIndex}
    <span
      class="salary-range-value"
      style={`right: ${(1 - labelIndex / (labels.length - 1)) * 100}%`}>
      {label}
    </span>
  {/each}
</div>
