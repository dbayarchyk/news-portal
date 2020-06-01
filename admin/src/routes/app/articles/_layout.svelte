<script>
  export let segment;
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
        <li>
          <a
            class="sidebar-link"
            href="./app/articles/draft"
            class:sidebar-link-active={segment === 'draft'}>
            Draft
          </a>
        </li>
        <li>
          <a
            class="sidebar-link"
            href="./app/articles/published"
            class:sidebar-link-active={segment === 'published'}>
            Published
          </a>
        </li>
        <li>
          <a
            class="sidebar-link"
            href="./app/articles/archived"
            class:sidebar-link-active={segment === 'archived'}>
            Archived
          </a>
        </li>
      </ul>
    </div>

    <div class="w-4/5 pl-6">
      <slot />
    </div>
  </section>
</section>
