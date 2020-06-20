<script>
  import CommentsList from "./CommentsList.svelte";

  export let id;
  export let comments = [];

  function buildCommentsMap(commentsList) {
    const commentsChildrenMap = new Map();

    commentsList.forEach(comment => {
      const commnetCopy = Object.assign({}, comment, { parentComment: null });

      commentsChildrenMap.set(comment.id, commnetCopy);
    });

    return commentsChildrenMap;
  }

  function buildCommentsTree(commentsList) {
    const commentsMap = buildCommentsMap(commentsList);

    commentsMap.forEach((comment, commentId, map) => {
      const parentComment = map.get(comment.parent_comment_id);

      if (!parentComment) {
        return;
      }

      comment.parentComment = parentComment;

      if (!parentComment.childrenComments) {
        parentComment.childrenComments = [];
      }

      parentComment.childrenComments.push(comment);
    });

    return Array.from(commentsMap.values()).filter(
      comment => comment.parentComment === null
    );
  }

  $: commentsTree = buildCommentsTree(comments);
</script>

<CommentsList
  comments={commentsTree}
  {id}
  ariaLabelledby="comments"
  on:create />
