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

  export let articles;
  export let error;
</script>

<style>
  ul {
    margin: 0 0 1em 0;
    line-height: 1.5;
  }
</style>

<svelte:head>
  <title>IT Dog</title>
</svelte:head>

{#if error}
  <Error status={error.status} message={error.message} />
{:else}
  <ul>
    {#each articles as article}
      <li class="mb-5">
        <h2 class="headline-1">
          <a class="hover:underline" rel="prefetch" href="article/{article.id}">
            {article.title}
          </a>
        </h2>
      </li>
    {/each}
  </ul>
{/if}
