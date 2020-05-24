<script>
  import Header from "../components/Header.svelte";
  import Nav from "../components/Nav.svelte";
  import Search from "../components/Search.svelte";

  export let segment;
</script>

<div class="divide-y divide-gray-400">
  <Header />

  <div class="flex items-center justify-between py-4">
    <Nav {segment} />
    <Search />
  </div>

  <main>
    <slot />
  </main>
</div>
