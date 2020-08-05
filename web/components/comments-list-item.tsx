import React from "react";

import CommentsList, { CommentTreeItem } from "./comments-list";

type CommentsListItemProps = {
  comment: CommentTreeItem;
};

const CommentsListItem: React.FC<CommentsListItemProps> = ({ comment }) => {
  return (
    <li>
      <div id={comment.id}>
        <p>{new Date(comment.createdAt).toLocaleDateString()}</p>
        <p>{comment.content}</p>
      </div>

      {comment.childrenComments && (
        <CommentsList
          describedBy={comment.id}
          comments={comment.childrenComments}
        />
      )}
    </li>
  );
};

export default CommentsListItem;
