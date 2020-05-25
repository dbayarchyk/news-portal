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
  import Error from "../../components/Error.svelte";

  export let article;
  export let error;
</script>

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
  <h1 class="headline-1">{article.title}</h1>

  <div class="content">
    {@html article.content}
  </div>
{/if}
