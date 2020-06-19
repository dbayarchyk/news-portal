<script>
  import Comment from "./Comment.svelte";

  export let comments = [];
  export let ariaLabelledby;
</script>

<ul class="mt-2" aria-labelledby={ariaLabelledby}>
  {#each comments as comment, commentIndex}
    <li class:mt-6={commentIndex !== 0}>
      <Comment {comment} />
    </li>
  {/each}
</ul>
