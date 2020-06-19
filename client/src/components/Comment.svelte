<script>
  import { createEventDispatcher } from "svelte";
  import jwtDecode from "jwt-decode";

  import CommentsList from "./CommentsList.svelte";
  import CommentForm from "./CommentForm.svelte";
  import { getAccessToken } from "../utils/accessToken";

  export let comment;
  export let serverSession;

  const dispatch = createEventDispatcher();

  let isCommentFormVisible = false;

  function showCommentForm() {
    isCommentFormVisible = true;
  }

  function hideCommentForm() {
    isCommentFormVisible = false;
  }

  function handleCreateComment(event) {
    dispatch("create", event.detail);
    hideCommentForm();
  }

  $: accessTokenPayload = jwtDecode(getAccessToken(serverSession));
  $: canReply = accessTokenPayload && accessTokenPayload.permissions && accessTokenPayload.permissions.includes('COMMENT_CREATE');
  $: authorElementId = `comment-${comment.id}-author`;
  $: createdDateElementId = `comment-${comment.id}-created-date`;
  $: contentElementId = `comment-${comment.id}-content`;
</script>

<div>
  <p>
    {#if comment.author && comment.author.username}
      <span class="body-text-primary" id={authorElementId}>
        {comment.author.username}
      </span>
    {/if}
    <span class="body-text-secondary" id={createdDateElementId}>
      <span aria-hidden="trues">•</span>
      {new Date(comment.created_date).toLocaleDateString()}
    </span>
  </p>
  <p class="body-text-normal" id={contentElementId}>{comment.content}</p>

  {#if !isCommentFormVisible && canReply}
    <button
      type="button"
      class="link"
      aria-describedby={`${authorElementId} ${createdDateElementId} ${contentElementId}`}
      on:click={showCommentForm}>
      Reply
    </button>
  {/if}
</div>

{#if comment.childrenComments || isCommentFormVisible}
  <div class="pl-8 border-l-2 border-gray-400">
    {#if isCommentFormVisible}
      <CommentForm
        articleId={comment.article_id}
        parentCommentId={comment.id}
        {serverSession}
        on:create={handleCreateComment}>
        <button
          slot="additional-buttons"
          class="button-outline mr-2"
          type="button"
          on:click={hideCommentForm}>
          Cancel
        </button>
      </CommentForm>
    {/if}

    <div class:mt-4={isCommentFormVisible}>
      <CommentsList
        comments={comment.childrenComments}
        {serverSession}
        ariaLabelledby={contentElementId}
        on:create />
    </div>
  </div>
{/if}
