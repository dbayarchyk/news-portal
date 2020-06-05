<script context="module">
  import jwtDecode from 'jwt-decode';

  import { getAccessToken } from "../../utils/accessToken";

  export async function preload(page, serverSession) {
    const accessTokenPayload = jwtDecode(getAccessToken(serverSession));

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
