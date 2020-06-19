<script>
  import Comment from "./Comment.svelte";

  export let id;
  export let comments = [];
  export let ariaLabelledby;
  export let serverSession;
</script>

<ul class="mt-2" {id} aria-labelledby={ariaLabelledby}>
  {#each comments as comment, commentIndex}
    <li class:mt-6={commentIndex !== 0}>
      <Comment {comment} {serverSession} on:create />
    </li>
  {/each}
</ul>
