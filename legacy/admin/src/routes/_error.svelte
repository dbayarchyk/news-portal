<script>
  export let status;
  export let error;

  const dev = process.env.NODE_ENV === "development";
</script>

<svelte:head>
  <title>{status} | ItDog Admin</title>
</svelte:head>

<div class="flex flex-col items-center justify-center">
  <h1 class="text-6xl leading-generic font-semibold">{status}</h1>

  <p class="text-4xl leading-generic mt-4">{error.message}</p>

  {#if dev && error.stack}
    <pre>{error.stack}</pre>
  {/if}
</div>
