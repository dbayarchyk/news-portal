<script>
  import { stores } from "@sapper/app";

  import canViewDraftArticles from "../../../utils/permissions/canViewDraftArticles";
  import canViewPublishedArticles from "../../../utils/permissions/canViewPublishedArticles";
  import canViewArchivedArticles from "../../../utils/permissions/canViewArchivedArticles";

  export let segment;

  const { session } = stores();
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
        {#if canViewDraftArticles($session.currentUser)}
          <li>
            <a
              class="sidebar-link"
              href="./app/articles/draft"
              class:sidebar-link-active={segment === 'draft'}>
              Draft
            </a>
          </li>
        {/if}
        {#if canViewPublishedArticles($session.currentUser)}
          <li>
            <a
              class="sidebar-link"
              href="./app/articles/published"
              class:sidebar-link-active={segment === 'published'}>
              Published
            </a>
          </li>
        {/if}
        {#if canViewArchivedArticles($session.currentUser)}
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
