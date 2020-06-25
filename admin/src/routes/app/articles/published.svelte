<script context="module">
  import { getArticles } from "../../../api/article";
  import extendFetchWithAuth from "../../../utils/extendFetchWithAuth";

  export async function preload(page, session) {
    const response = await getArticles(
      extendFetchWithAuth(this.fetch, session),
      {
        page: 1,
        page_size: 10,
        status: "PUBLISHED"
      }
    );
    const responseData = await response.json();

    return {
      items: responseData.items,
      itemsCount: responseData.items_count,
      pageSize: responseData.page_size,
      page: responseData.page
    };
  }
</script>

<script>
  import { stores } from "@sapper/app";

  import Pagination from "../../../components/Pagination.svelte";
  import { canEditArticle } from "../../../utils/actionPermissions";

  export let items = [];
  export let itemsCount = 0;
  export let pageSize = 0;
  export let page = 0;

  const { session } = stores();

  let tableEl;

  async function hanldePageChange(event) {
    const response = await getArticles(extendFetchWithAuth(fetch, $session), {
      status: "PUBLISHED",
      page: event.detail.page,
      page_size: event.detail.pageSize
    });
    const responseData = await response.json();

    items = responseData.items;
    itemsCount = responseData.items_count;
    pageSize = responseData.page_size;
    page = responseData.page;

    if (tableEl) {
      tableEl.focus();
    }
  }
</script>

<svelte:head>
  <title>Published articles | IT Dog Admin</title>
</svelte:head>

<div>
  <div class="flex items-center">
    <h1 class="headline-4">Articles</h1>

    <ul class="ml-auto">
      <li>
        <a href="./app/article/editor" class="link">Create Article</a>
      </li>
    </ul>
  </div>

  <div class="table-container mt-4">
    <table class="table">
      <thead>
        <tr>
          <td class="table-head-cell body-text-secondary" aria-label="Index">
            #
          </td>
          <td class="table-head-cell">Title</td>
          <td class="table-head-cell">Author</td>
          <td class="table-head-cell text-right">Comments</td>
          <td class="table-head-cell text-right">Views</td>
          <td class="table-head-cell">Created Date</td>
          <td class="table-head-cell" aria-label="Actions" />
        </tr>
      </thead>

      <tbody>
        {#each items as article}
          <tr>
            <td class="table-cell body-text-secondary">{article.id}</td>
            <td class="table-cell body-text-primary">{article.title}</td>
            <td class="table-cell">
              {article.author && article.author.username ? article.author.username : 'Uknown'}
            </td>
            <td class="table-cell text-right">{article.comments_count}</td>
            <td class="table-cell text-right">0</td>
            <td class="table-cell">
              {new Date(article.created_date).toLocaleDateString()}
            </td>
            <td class="table-cell">
              {#if canEditArticle(article, $session.currentUser)}
                <a class="link" href={`./app/article/editor/${article.id}`}>
                  Edit
                </a>
              {/if}
            </td>
          </tr>
        {/each}
      </tbody>
    </table>

    <Pagination {page} {pageSize} {itemsCount} on:change={hanldePageChange} />
  </div>
</div>
