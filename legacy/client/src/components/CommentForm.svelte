<script>
  import { stores } from "@sapper/app";
  import { createEventDispatcher } from "svelte";
  import { get } from "svelte/store";

  import ValidationErrors from "../errors/validationErrors";
  import { createComment } from "../api/comment";
  import extendFetchWithAuth from "../utils/auth/extendFetchWithAuth";
  import canCreateComment from "../utils/permissions/canCreateComment";

  export let articleId;
  export let parentCommentId = null;

  const { session } = stores();
  const dispatch = createEventDispatcher();

  let isCreatingArticle = false;
  let commnet = "";
  let formError = "";

  async function handleSubmit() {
    isCreatingArticle = true;

    try {
      const createdArticle = await createComment(
        extendFetchWithAuth(fetch, get(session)),
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

{#if !$session.currentUser}
  <a
    href="./signin"
    class="button button-outline block text-center w-full mt-3">
    Sign in to leave a comment
  </a>
{:else if canCreateComment($session.currentUser)}
  <form class="mt-3" on:submit|preventDefault={handleSubmit}>
    <div class="form-field mt-5">
      <label class="visually-hidden" for="comment">
        <div>Comment</div>
      </label>
      <textarea
        placeholder="Type your comment here..."
        class="input block w-full resize-none h-32"
        name="comment"
        bind:value={commnet}
        aria-invalid={!!formError}
        aria-describedby="comment-error" />
      {#if formError}
        <p
          class="body-text body-text-error"
          id="comment-error"
          aria-live="assertive"
          role="alert">
          {formError}
        </p>
      {/if}
    </div>

    <div class="mt-2">
      <slot name="additional-buttons" />

      <button class="button button-primary" type="submit">
        {isCreatingArticle ? 'Posting the comment ...' : 'Leave a comment'}
      </button>
    </div>
  </form>
{/if}
