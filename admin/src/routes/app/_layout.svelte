<script context="module">
  import AccessTokenService from "../../services/accessTokenService";

  export async function preload(page, session) {
    const accessTokenService = new AccessTokenService(session);

    const accessTokenPayload = accessTokenService.getTokenPayload();

    if (
      !accessTokenPayload ||
      !["WRITER", "ADMIN"].includes(accessTokenPayload.role)
    ) {
      return this.redirect(307, "./signin");
    }
  }
</script>

<script>
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
