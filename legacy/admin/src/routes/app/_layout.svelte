<script context="module">
  export async function preload(page, session) {
    if (
      !session ||
      !session.currentUser ||
      !["WRITER", "ADMIN"].includes(session.currentUser.role)
    ) {
      return this.redirect(307, "./signin");
    }
  }
</script>

<script>
  import { goto } from "@sapper/app";

  import Header from "../../components/Header.svelte";
  import Nav from "../../components/Nav.svelte";

  export let segment;
</script>

<div class="divide-y divide-gray-400">
  <Header />

  <div class="layout-container flex items-center justify-between py-4">
    <Nav {segment} />
  </div>

  <main class="layout-container">
    <slot />
  </main>
</div>
