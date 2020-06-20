<script>
  import { stores } from "@sapper/app";

  import Header from "../components/Header.svelte";
  import Nav from "../components/Nav.svelte";

  export let segment;

  const { session } = stores();
</script>

<div class="divide-y divide-gray-400">
  <Header />

  <div class="layout-container flex items-center justify-between py-4">
    <Nav {segment} />

    {#if segment !== 'signin'}
      {#if $session.currentUser}
        <span class="body-text-primary">{$session.currentUser.username}</span>
      {:else}
        <a href="./signin" class="link">Sign In</a>
      {/if}
    {/if}
  </div>

  <main class="layout-container py-5">
    <slot />
  </main>
</div>
