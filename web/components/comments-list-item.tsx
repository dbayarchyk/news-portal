import React from "react";
import {
  useDisclosureState,
  Disclosure,
  DisclosureContent,
} from "reakit/Disclosure";

import CommentsList, { CommentTreeItem } from "./comments-list";
import CommentForm from "./comment-form";
import { Comment } from "../api/comment";

type CommentsListItemProps = {
  comment: CommentTreeItem;
  onReply?: (createdComment: Comment) => void;
};

const CommentsListItem: React.FC<CommentsListItemProps> = ({
  comment,
  onReply,
}) => {
  const replyButtonEl = React.useRef<HTMLButtonElement>(null);
  const replyCommentTextareaEl = React.useRef<HTMLTextAreaElement>(null);
  const replyCommentFormDisclosure = useDisclosureState();

  React.useLayoutEffect(() => {
    if (replyCommentFormDisclosure.visible && replyCommentTextareaEl.current) {
      replyCommentTextareaEl.current.focus();
    }
  }, [replyCommentTextareaEl.current, replyCommentFormDisclosure.visible]);

  const handleReplyFormCanceling = () => {
    replyCommentFormDisclosure.hide();
    replyButtonEl.current.focus();
  };

  const handleCommentCreation = (comment: Comment) => {
    replyCommentFormDisclosure.hide();
    replyButtonEl.current.focus();

    if (onReply) {
      onReply(comment);
    }
  };

  return (
    <li>
      <div id={comment.id}>
        <p>{new Date(comment.createdAt).toLocaleDateString()}</p>
        <p>{comment.content}</p>
        <Disclosure {...replyCommentFormDisclosure} ref={replyButtonEl}>
          Reply
        </Disclosure>
      </div>

      {comment.childrenComments && (
        <CommentsList
          describedBy={comment.id}
          comments={comment.childrenComments}
          onReply={onReply}
        />
      )}

      <DisclosureContent {...replyCommentFormDisclosure}>
        <CommentForm
          textareaRef={replyCommentTextareaEl}
          articleId={comment.articleId}
          parentCommentId={comment.id}
          extraControl={
            <button type="button" onClick={handleReplyFormCanceling}>
              Cancel
            </button>
          }
          onCreate={onReply}
        />
      </DisclosureContent>
    </li>
  );
};

export default CommentsListItem;
