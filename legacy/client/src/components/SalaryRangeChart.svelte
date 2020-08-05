<script>
  export let min = 0;
  export let max = 0;
  export let ticks = 4;

  const TICK_RANGE_MULTIPLIER = 1000;

  $: range = max - min;
  $: tickRange =
    Math.ceil(range / ticks / TICK_RANGE_MULTIPLIER) * TICK_RANGE_MULTIPLIER;
  $: lowerBound = tickRange * Math.floor(min / tickRange);
  $: upperBound = tickRange * Math.ceil(max / tickRange);
</script>

<slot {lowerBound} {upperBound} {tickRange} />
