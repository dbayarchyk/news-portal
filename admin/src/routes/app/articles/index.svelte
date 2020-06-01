<script context="module">
  import ArticleService from "../../../services/articleService";

  export async function preload(page, session) {
    const articleService = new ArticleService(this.fetch, session);

    const response = await articleService.getArticles();
    const responseData = await response.json();

    return { articles: responseData.items };
  }
</script>

<script>
  export let articles = [];
</script>

<svelte:head>
  <title>All articles | IT Dog Admin</title>
</svelte:head>

<div class="table-container">
  <table>
    <thead>
      <tr>
        <td class="table-head-cell body-text-secondary" aria-label="Index">
          #
        </td>
        <td class="table-head-cell">Title</td>
        <td class="table-head-cell">Status</td>
        <td class="table-head-cell">Author</td>
        <td class="table-head-cell text-right">Views</td>
        <td class="table-head-cell">Created Date</td>
      </tr>
    </thead>

    <tbody>
      {#each articles as article}
        <tr>
          <td class="table-cell body-text-secondary">{article.id}</td>
          <td class="table-cell body-text-primary">{article.title}</td>
          <td class="table-cell">
            <span
              class:badge={article.status === 'DRAFT'}
              class:badge-green={article.status === 'PUBLISHED'}
              class:badge-red={article.status === 'ARCHIVED'}>
              {article.status}
            </span>
          </td>
          <td class="table-cell">{article.author_id}</td>
          <td class="table-cell text-right">0</td>
          <td class="table-cell">
            {new Date(article.created_date).toLocaleDateString()}
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
