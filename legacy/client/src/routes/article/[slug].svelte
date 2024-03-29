<script context="module">
  import { getArticleById } from "../../api/article";
  import { getComments } from "../../api/comment";
  import extendFetchWithAuth from "../../utils/auth/extendFetchWithAuth";

  export async function preload(page, session) {
    const [articleResponse, commentsResponse] = await Promise.all([
      getArticleById(
        extendFetchWithAuth(this.fetch, session),
        page.params.slug
      ),
      getComments(extendFetchWithAuth(this.fetch, session), {
        article_id: page.params.slug
      })
    ]);
    const articleResponseData = await articleResponse.json();
    const commentsResponseData = await commentsResponse.json();

    if (articleResponse.ok) {
      return {
        article: articleResponseData,
        comments: commentsResponseData.items || []
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
  import CommentForm from "../../components/CommentForm.svelte";
  import CommentsTree from "../../components/CommentsTree.svelte";

  export let article;
  export let comments;
  export let error;

  let commentsTreeEl;

  function handleCreateComment(event) {
    comments = [...comments, event.detail];
  }
</script>

<style>
  .article {
    max-width: 75ch;
  }
</style>

<svelte:head>
  {#if article}
    <title>{article.title} | IT Dog</title>
  {:else}
    <title>{error.status} | IT Dog</title>
  {/if}
</svelte:head>

{#if error}
  <Error status={error.status} message={error.message} />
{:else}
  <article class="article mx-auto">
    <h1 class="headline headline-1 text-center">{article.title}</h1>

    <p class="body-text body-text-secondary text-center mt-5">
      {#if article.author && article.author.username}
        <span>{article.author.username}</span>
        |
      {/if}
      <span>{new Date(article.created_date).toLocaleDateString()}</span>
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

    <div class="mt-5">
      <h2 class="headline headline-2" id="comments">Comments</h2>

      <CommentsTree
        id="comments-list"
        {comments}
        ariaLabelledby="comments"
        on:create={handleCreateComment} />

      <CommentForm articleId={article.id} on:create={handleCreateComment} />
    </div>
  </article>
{/if}
