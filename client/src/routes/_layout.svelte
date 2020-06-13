<script>
  import Header from "../components/Header.svelte";
  import Nav from "../components/Nav.svelte";

  export let segment;
</script>

<div class="divide-y divide-gray-400">
  <Header />

  <div class="layout-container py-4">
    <Nav {segment} />
  </div>

  <main class="layout-container py-5">
    <slot />
  </main>
</div>
