<script context="module">
  import { getArticles } from "../services/article";

  export async function preload({ params, query }) {
    const articlesResult = await getArticles();

    if (articlesResult.ok) {
      const data = await articlesResult.json();

      return { articles: data.items };
    }

    return {
      error: {
        status: articleResponse.status,
        message: data.message
      }
    };
  }
</script>

<script>
  import Error from "../components/Error.svelte";
  import ArticleCard from "../components/ArticleCard.svelte";

  export let articles;
  export let error;
</script>

<svelte:head>
  <title>IT Dog</title>
</svelte:head>

{#if error}
  <Error status={error.status} message={error.message} />
{:else}
  <section class="py-3">
    <h1 class="headline-1">News</h1>

    <ul class="grid grid-cols-4 gap-2 mt-2">
      {#each articles as article}
        <li>
          <ArticleCard articleId={article.id} title={article.title} />
        </li>
      {/each}
    </ul>
  </section>
{/if}
