<script>
  export let min = 0;
  export let max = 0;
  export let ticks = 4;

  $: range = max - min;
  $: tickRange = Math.ceil(range / ticks / 5) * 5;
  $: lowerBound = tickRange * Math.round(min / tickRange);
  $: upperBound = tickRange * Math.ceil(max / tickRange);
</script>

<slot {lowerBound} {upperBound} {tickRange} {ticks} />
