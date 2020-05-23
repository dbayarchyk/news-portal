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

<h1 id="headline">Recent articles</h1>

<ul aria-labelledby="headline">
  {#each articles as article}
    <!-- we're using the non-standard `rel=prefetch` attribute to
				tell Sapper to load the data for the page as soon as
				the user hovers over the link or taps it, instead of
				waiting for the 'click' event -->
    <li>
      <a rel="prefetch" href="article/{article.id}">
        <h2>{article.title}</h2>
      </a>
    </li>
  {/each}
</ul>
