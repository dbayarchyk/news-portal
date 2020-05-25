<script context="module">
  import { getArticleById } from "../../services/article";

  export async function preload({ params, query }) {
    const articleResponse = await getArticleById(params.slug);
    const data = await articleResponse.json();

    if (articleResponse.ok) {
      return {
        article: data
      };
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
  import marked from "marked";
  import readingTime from "reading-time";

  import Error from "../../components/Error.svelte";

  export let article;
  export let error;
</script>

<style>
  .article {
    max-width: 75ch;
  }
</style>

<svelte:head>
  {#if article}
    <title>{article.title}</title>
  {:else}
    <title>{error.status}</title>
  {/if}
</svelte:head>

{#if error}
  <Error status={error.status} message={error.message} />
{:else}
  <article class="article mx-auto">
    <h1 class="headline-1 text-center mt-5">{article.title}</h1>

    <p class="body-text-secondary text-center mt-5">
      <span>Dzmitry Bayarchyk</span>
      |
      <span>{new Date().toLocaleDateString()}</span>
      |
      <span>
        {Math.round(readingTime(article.content).minutes)} min read ☕️
      </span>
    </p>

    <img
      class="w-full mt-8"
      src={`https://picsum.photos/600/300?random=${article.id}`}
      alt="" />

    <div class="markdown mt-5">
      {@html marked(article.content)}
    </div>
  </article>
{/if}
