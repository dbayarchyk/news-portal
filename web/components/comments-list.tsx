import React from "react";

import CommentsListItem from "./comments-list-item";
import { Comment } from "../api/comment";
import Stack from "./ui/layouts/stack";
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
    <Stack
      as="ul"
      className={styles.list}
      aria-describedby={describedBy}
      scale="4"
    >
      {comments.map((comment) => (
        <CommentsListItem
          key={comment.id}
          comment={comment}
          onReply={onReply}
        />
      ))}
    </Stack>
  );
};

export default CommentsList;
