import React from "react";

import CommentsListItem from "./comments-list-item";
import { Comment } from "../api/comment";

export type CommentTreeItem = Comment & {
  parentComment: Comment;
  childrenComments: CommentTreeItem[];
};

type CommentsListProps = {
  describedBy: string;
  comments: CommentTreeItem[];
};

const CommentsList: React.FC<CommentsListProps> = ({
  describedBy,
  comments,
}) => {
  return (
    <ul aria-describedby={describedBy}>
      {comments.map((comment) => (
        <CommentsListItem key={comment.id} comment={comment} />
      ))}
    </ul>
  );
};

export default CommentsList;
