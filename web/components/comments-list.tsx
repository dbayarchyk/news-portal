import React from "react";

import CommentsListItem from "./comments-list-item";
import { Comment } from "../api/comment";
import styles from "./comments-list.module.scss";

export type CommentTreeItem = Comment & {
  parentComment: Comment;
  childrenComments: CommentTreeItem[];
};

type CommentsListProps = {
  describedBy: string;
  comments: CommentTreeItem[];
  onReply?: (createdComment: Comment) => void;
};

const CommentsList: React.FC<CommentsListProps> = ({
  describedBy,
  comments,
  onReply,
}) => {
  return (
    <ul className={styles.list} aria-describedby={describedBy}>
      {comments.map((comment) => (
        <CommentsListItem
          key={comment.id}
          comment={comment}
          onReply={onReply}
        />
      ))}
    </ul>
  );
};

export default CommentsList;
