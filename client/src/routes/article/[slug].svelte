<script context="module">
  import { getArticleById } from "../../utils/article";
  import { getComments } from "../../utils/comment";
  import extendFetchWithAuthHeaders from "../../utils/extendFetchWithAuthHeaders";

  export async function preload(page, session) {
    const [articleResponse, commentsResponse] = await Promise.all([
      getArticleById(
        extendFetchWithAuthHeaders(this.fetch, session),
        page.params.slug
      ),
      getComments(extendFetchWithAuthHeaders(this.fetch, session), {
        article_id: page.params.slug
      })
    ]);
    const articleResponseData = await articleResponse.json();
    const commentsResponseData = await commentsResponse.json();

    if (articleResponse.ok) {
      return {
        serverSession: session,
        article: articleResponseData,
        comments: commentsResponseData.items || []
      };
    }

    return {
      error: {
        serverSession: session,
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
  export let serverSession;

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
    <title>{article.title}</title>
  {:else}
    <title>{error.status}</title>
  {/if}
</svelte:head>

{#if error}
  <Error status={error.status} message={error.message} />
{:else}
  <article class="article mx-auto">
    <h1 class="headline-1 text-center">{article.title}</h1>

    <p class="body-text-secondary text-center mt-5">
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
      <h2 class="headline-2" id="comments">Comments</h2>

      <CommentsTree
        id="comments-list"
        {comments}
        {serverSession}
        ariaLabelledby="comments"
        on:create={handleCreateComment} />

      <CommentForm
        {serverSession}
        articleId={article.id}
        on:create={handleCreateComment} />
    </div>
  </article>
{/if}
