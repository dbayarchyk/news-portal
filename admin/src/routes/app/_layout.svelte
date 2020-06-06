<script context="module">
  import jwtDecode from "jwt-decode";

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
  import { onMount } from "svelte";
  import { goto } from "@sapper/app";

  import Header from "../../components/Header.svelte";
  import Nav from "../../components/Nav.svelte";
  import { refresh } from "../../utils/auth";

  export let segment;

  function setNextRefreshTokenUpdate() {
    const accessTokenPayload = jwtDecode(getAccessToken());

    if (!accessTokenPayload || !accessTokenPayload["sub"]) {
      return;
    }

    const expDateInMiliseconds = accessTokenPayload["exp"] * 1000;
    const nowInMiliseconds = Date.now();
    const expInMiliseconds = expDateInMiliseconds - nowInMiliseconds;
    const nextRefreshTimeInMiliseconds = Math.round((expInMiliseconds * 3) / 4);

    return setTimeout(async () => {
      try {
        await refresh(fetch);
      } catch {
        await goto(`./signin`);
      }

      setNextRefreshTokenUpdate();
    }, nextRefreshTimeInMiliseconds);
  }

  onMount(setNextRefreshTokenUpdate);
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
