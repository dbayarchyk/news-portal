<svelte:head>
  <title>IT Dog Admin | Articles</title>
</svelte:head>

<section class="py-3">
  <div class="flex justify-between items-center">
    <h1 class="headline-1">Articles</h1>

    <div>Actions</div>
  </div>

  <section class="mt-4 flex">
    <div>
      <ul class="list-inside list-disc">
        <li class="body-text-normal">
          <a class="link" href="./articles">All</a>
        </li>
        <li class="body-text-normal">
          <a class="link" href="./articles/published">Published</a>
        </li>
        <li class="body-text-normal">
          <a class="link" href="./articles/draft">Draft</a>
        </li>
        <li class="body-text-normal">
          <a class="link" href="./articles/archived">Archived</a>
        </li>
      </ul>
    </div>

    <div>
      <table>
        <thead>
          <tr>
            <td />
            <td>Title</td>
            <td>Status</td>
            <td>Author</td>
            <td>Views</td>
          </tr>
        </thead>

        <tbody />
      </table>
    </div>
  </section>
</section>
