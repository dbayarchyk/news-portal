<script>
  export let segment;

  const items = [
    {
      title: "Home",
      href: "./app"
    },
    {
      title: "Articles",
      href: "./app/articles"
    },
    {
      title: "Users",
      href: "./app/users"
    }
  ];
</script>

<nav>
  <ul class="flex list-none p-0 m-0">
    {#each items as item}
      <li class="mr-6">
        <a
          class="text-base font-semibold hover:underline"
          aria-current={segment === item.href ? 'page' : undefined}
          href={item.href}>
          {item.title}
        </a>
      </li>
    {/each}
  </ul>
</nav>
