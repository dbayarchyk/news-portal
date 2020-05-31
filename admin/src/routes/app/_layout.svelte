<script context="module">
  import AccessTokenService from "../../services/accessTokenService";

  export async function preload(page, session) {
    const accessTokenService = new AccessTokenService(session);

    if (!accessTokenService.getToken()) {
      return this.redirect(307, "./signin");
    }

    return { serverAccessToken: accessTokenService.getToken() };
  }
</script>

<script>
  import { onMount } from "svelte";

  import Header from "../../components/Header.svelte";
  import Nav from "../../components/Nav.svelte";
  import ClientAccessTokenService from "../../services/accessTokenService";

  export let segment;
  export let serverAccessToken;

  onMount(() => {
    const accessTokenService = new AccessTokenService();

    accessTokenService.setInMemoryToken(serverAccessToken);
  });
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
