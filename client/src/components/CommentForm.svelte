<script>
  import { createEventDispatcher } from "svelte";
  import jwtDecode from "jwt-decode";

  import ValidationErrors from "../errors/validationErrors";
  import { getAccessToken } from "../utils/accessToken";
  import { createComment } from "../utils/comment";
  import extendFetchWithAuthHeaders from "../utils/extendFetchWithAuthHeaders";

  export let serverSession;
  export let articleId;
  export let parentCommentId = null;

  const dispatch = createEventDispatcher();

  let isCreatingArticle = false;
  let commnet = "";
  let formError = "";

  $: accessTokenPayload = jwtDecode(getAccessToken(serverSession));
  $: isSignedIn = !!accessTokenPayload;

  async function handleSubmit() {
    isCreatingArticle = true;

    try {
      const createdArticle = await createComment(
        extendFetchWithAuthHeaders(fetch),
        {
          content: commnet,
          article_id: articleId,
          parent_comment_id: parentCommentId
        }
      );

      commnet = "";
      formError = "";

      dispatch("create", createdArticle);
    } catch (err) {
      if (err instanceof ValidationErrors) {
        formError = Object.values(err.errors)[0];
      } else {
        formError = err.message;
      }
    } finally {
      isCreatingArticle = false;
    }
  }
</script>

{#if !isSignedIn}
  <a href="./signin" class="button-outline block text-center w-full mt-3">
    Sign in to leave a comment
  </a>
{:else if accessTokenPayload.permissions && accessTokenPayload.permissions.includes('COMMENT_CREATE')}
  <form class="mt-3" on:submit|preventDefault={handleSubmit}>
    <div class="form-field mt-5">
      <label class="visually-hidden" for="comment">Comment</label>
      <textarea
        placeholder="Type your comment here..."
        class="input block w-full resize-none h-32"
        name="comment"
        bind:value={commnet}
        aria-invalid={!!formError}
        aria-describedby="comment-error" />
      {#if formError}
        <p
          class="error-text"
          id="comment-error"
          aria-live="assertive"
          role="alert">
          {formError}
        </p>
      {/if}
    </div>

    <div class="mt-2">
      <button class="button" type="submit">
        {isCreatingArticle ? 'Posting the comment ...' : 'Leave a comment'}
      </button>
    </div>
  </form>
{/if}
