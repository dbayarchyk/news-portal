<script>
  import CommentsList from "./CommentsList.svelte";

  export let comment;
</script>

<div>
  <p>
    {#if comment.author && comment.author.username}
      <span class="body-text-primary">{comment.author.username}</span>
    {/if}
    <span class="body-text-secondary">
      • {new Date(comment.created_date).toLocaleDateString()}
    </span>
  </p>
  <p class="body-text-normal">{comment.content}</p>
</div>

{#if comment.childrenComments}
  <div class="pl-8 border-l-2 border-gray-400">
    <CommentsList comments={comment.childrenComments} />
  </div>
{/if}
