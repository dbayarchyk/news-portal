<script context="module">
  import { getArticles } from "../../../utils/article";
  import extendFetchWithAuthHeaders from "../../../utils/extendFetchWithAuthHeaders";

  export async function preload(page, serverSession) {
    const response = await getArticles(
      extendFetchWithAuthHeaders(this.fetch, serverSession),
      { status: "DRAFT", page: 1, page_size: 10 }
    );
    const responseData = await response.json();

    return {
      serverSession,
      items: responseData.items,
      itemsCount: responseData.items_count,
      pageSize: responseData.page_size,
      page: responseData.page
    };
  }
</script>

<script>
  import jwtDecode from "jwt-decode";

  import Pagination from "../../../components/Pagination.svelte";
  import { getAccessToken } from "../../../utils/accessToken";
  import { canEditArticle } from "../../../utils/actionPermissions";

  export let serverSession;
  export let items = [];
  export let itemsCount = 0;
  export let pageSize = 0;
  export let page = 0;

  $: accessTokenPayload = jwtDecode(getAccessToken(serverSession));

  let tableEl;

  async function hanldePageChange(event) {
    const response = await getArticles(extendFetchWithAuthHeaders(fetch), {
      status: "DRAFT",
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
  <title>Draft articles | IT Dog Admin</title>
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
            <td class="table-cell">
              {new Date(article.created_date).toLocaleDateString()}
            </td>
            <td class="table-cell">
              {#if canEditArticle(article, accessTokenPayload)}
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
