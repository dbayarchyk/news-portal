<script context="module">
  export async function preload(page, serverSession) {
    return {
      serverSession
    };
  }
</script>

<script>
  import jwtDecode from "jwt-decode";

  import {
    canViewDraftArticles,
    canViewPublishedArticles,
    canViewArchivedArticles
  } from "./_actionVisibilities";
  import { getAccessToken } from "../../../utils/accessToken";

  export let serverSession;
  export let segment;

  $: accessTokenPayload = jwtDecode(getAccessToken(serverSession));
</script>

<section class="py-3">
  <section class="mt-4 flex">
    <div class="w-1/5">
      <ul>
        <li>
          <a
            class="sidebar-link"
            href="./app/articles"
            class:sidebar-link-active={!segment}>
            All
          </a>
        </li>
        {#if canViewDraftArticles(accessTokenPayload)}
          <li>
            <a
              class="sidebar-link"
              href="./app/articles/draft"
              class:sidebar-link-active={segment === 'draft'}>
              Draft
            </a>
          </li>
        {/if}
        {#if canViewPublishedArticles(accessTokenPayload)}
          <li>
            <a
              class="sidebar-link"
              href="./app/articles/published"
              class:sidebar-link-active={segment === 'published'}>
              Published
            </a>
          </li>
        {/if}
        {#if canViewArchivedArticles(accessTokenPayload)}
          <li>
            <a
              class="sidebar-link"
              href="./app/articles/archived"
              class:sidebar-link-active={segment === 'archived'}>
              Archived
            </a>
          </li>
        {/if}
      </ul>
    </div>

    <div class="w-4/5 pl-6">
      <slot />
    </div>
  </section>
</section>
