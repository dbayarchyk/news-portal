<script context="module">
  export async function preload(page, serverSession) {
    return {
      serverSession
    };
  }
</script>

<script>
  import { onMount } from "svelte";
  import { goto } from "@sapper/app";
  import jwtDecode from "jwt-decode";

  import Header from "../components/Header.svelte";
  import Nav from "../components/Nav.svelte";
  import { refresh } from "../utils/auth";
  import { getAccessToken } from "../utils/accessToken";

  export let segment;
  export let serverSession;

  function setNextRefreshTokenUpdate() {
    const accessTokenPayload = jwtDecode(getAccessToken(serverSession));

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

  $: accessTokenPayload = jwtDecode(getAccessToken(serverSession));
  $: isSignedIn = !!accessTokenPayload;
</script>

<div class="divide-y divide-gray-400">
  <Header />

  <div class="layout-container flex items-center justify-between py-4">
    <Nav {segment} />

    {#if segment !== 'signin'}
      {#if isSignedIn}
        <span class="body-text-primary">{accessTokenPayload.username}</span>
      {:else}
        <a href="./signin" class="link">Sign In</a>
      {/if}
    {/if}
  </div>

  <main class="layout-container py-5">
    <slot />
  </main>
</div>
