<script context="module">
  import { getArticles } from "../utils/article";
  import extendFetchWithAuth from "../utils/extendFetchWithAuth";

  export async function preload(page, session) {
    const articlesResult = await getArticles(
      extendFetchWithAuth(this.fetch, session),
      { status: "PUBLISHED" }
    );

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
  <section>
    <h1 class="headline-1">News</h1>

    <ul
      class="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 md:gap-4 gap-8
      mt-2">
      {#each articles as article}
        <li>
          <ArticleCard
            articleId={article.id}
            title={article.title}
            commentsCount={article.comments_count} />
        </li>
      {/each}
    </ul>
  </section>
{/if}
