import React from "react";
import {
  useDisclosureState,
  Disclosure,
  DisclosureContent,
} from "reakit/Disclosure";

import CommentsList, { CommentTreeItem } from "./comments-list";
import CommentForm from "./comment-form";
import { Comment } from "../api/comment";
import FlatButton from "./ui/buttons/flat-button";
import BodyText from "./ui/body-text";
import styles from "./comments-list-item.module.scss";

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

    if (replyButtonEl.current) {
      replyButtonEl.current.focus();
    }
  };

  const handleCommentCreation = (comment: Comment) => {
    replyCommentFormDisclosure.hide();

    if (replyButtonEl.current) {
      replyButtonEl.current.focus();
    }

    if (onReply) {
      onReply(comment);
    }
  };

  return (
    <li>
      <div id={comment.id}>
        <BodyText type="secondary">
          {new Date(comment.createdAt).toLocaleDateString()}
        </BodyText>
        <BodyText>{comment.content}</BodyText>
        <Disclosure {...replyCommentFormDisclosure}>
          {(disclosureProps) => (
            <FlatButton
              {...disclosureProps}
              ref={replyButtonEl}
              title="Reply"
            />
          )}
        </Disclosure>
      </div>

      {comment.childrenComments && (
        <div className={styles.nestedSection}>
          <CommentsList
            describedBy={comment.id}
            comments={comment.childrenComments}
            onReply={onReply}
          />
        </div>
      )}

      <DisclosureContent {...replyCommentFormDisclosure}>
        <div className={styles.nestedSection}>
          <CommentForm
            textareaRef={replyCommentTextareaEl}
            articleId={comment.articleId}
            parentCommentId={comment.id}
            extraControl={
              <FlatButton
                type="button"
                className={styles.cancelButton}
                title="Cancel"
                onClick={handleReplyFormCanceling}
              />
            }
            onCreate={onReply}
          />
        </div>
      </DisclosureContent>
    </li>
  );
};

export default CommentsListItem;
