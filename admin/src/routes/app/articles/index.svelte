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

<table>
  <thead>
    <tr>
      <td class="body-text-primary">#</td>
      <td class="body-text-primary">Title</td>
      <td class="body-text-primary">Status</td>
      <td class="body-text-primary">Author</td>
      <td class="body-text-primary text-right">Views</td>
      <td class="body-text-primary">Created Date</td>
    </tr>
  </thead>

  <tbody>
    {#each articles as article}
      <tr>
        <td class="body-text-secondary">{article.id}</td>
        <td class="body-text-primary">{article.title}</td>
        <td class="body-text-normal">{article.status}</td>
        <td class="body-text-normal">{article.author_id}</td>
        <td class="body-text-secondary text-right">0</td>
        <td class="body-text-normal">{article.created_date}</td>
      </tr>
    {/each}
  </tbody>
</table>
