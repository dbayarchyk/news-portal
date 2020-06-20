<script>
  import { stores } from "@sapper/app";
  import { createEventDispatcher } from "svelte";

  import CommentsList from "./CommentsList.svelte";
  import CommentForm from "./CommentForm.svelte";

  export let comment;

  const { session } = stores();
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

  $: canReply =
    $session.currentUser &&
    $session.currentUser.permissions.includes("COMMENT_CREATE");
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
      <span aria-hidden="true">•</span>
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
        ariaLabelledby={contentElementId}
        on:create />
    </div>
  </div>
{/if}
