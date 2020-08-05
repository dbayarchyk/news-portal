import React from "react";

import CommentsList, { CommentTreeItem } from "./comments-list";
import { Comment } from "../api/comment";

const buildCommentsMap = (comments: Comment[]): Map<string, Comment> => {
  const commentsChildrenMap = new Map<string, Comment>();

  comments.forEach((comment) => {
    const commentCopy = Object.assign({}, comment, { parentComment: null });

    commentsChildrenMap.set(comment.id, commentCopy);
  });

  return commentsChildrenMap;
};

const buildCommentsTree = (comments: Comment[]): CommentTreeItem[] => {
  const commentsMap = buildCommentsMap(comments) as Map<
    string,
    CommentTreeItem
  >;

  commentsMap.forEach((comment, _, map) => {
    const parentComment = map.get(comment.parentCommentId);

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
    (comment) => comment.parentComment === null
  );
};

type CommentsTreeProps = {
  describedBy: string;
  comments: Comment[];
  onReply?: (createdComment: Comment) => void;
};

const CommentsTree: React.FC<CommentsTreeProps> = ({
  describedBy,
  comments,
  onReply,
}) => {
  const commentsTree = buildCommentsTree(comments);

  return (
    <CommentsList
      describedBy={describedBy}
      comments={commentsTree}
      onReply={onReply}
    />
  );
};

export default CommentsTree;
