<script context="module">
  import { getArticles } from "../services/article";

  export async function preload({ params, query }) {
    const articlesResult = await getArticles();

    return { articles: articlesResult.items };
  }
</script>

<script>
  export let articles = [];
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

<ul>
  {#each articles as article}
    <li>
      <a class="hover:underline" rel="prefetch" href="article/{article.id}">
        <h2 class="headline-1">{article.title}</h2>
      </a>
    </li>
  {/each}
</ul>
