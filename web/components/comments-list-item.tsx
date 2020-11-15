import React from "react";
import {
  useDisclosureState,
  Disclosure,
  DisclosureContent,
} from "reakit/Disclosure";

import { useAuth } from '../context/auth';
import CommentsList, { CommentTreeItem } from "./comments-list";
import CommentForm from "./comment-form";
import { Comment } from "../api/comment";
import FlatButton from "./ui/buttons/flat-button";
import BodyText from "./ui/body-text";
import Stack from "./ui/layouts/stack";
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

  const auth = useAuth();

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
      <Stack scale="1">
        <div id={comment.id}>
          <Stack scale="2">
            <BodyText type="secondary">
              {new Date(comment.createdAt).toLocaleDateString()}
            </BodyText>
            <BodyText>{comment.content}</BodyText>
            <Disclosure {...replyCommentFormDisclosure}>
              {(disclosureProps) => auth.isSignedIn ? (
                <div>
                  <FlatButton
                    {...disclosureProps}
                    ref={replyButtonEl}
                    title="Reply"
                  />
                </div>
              ): null}
            </Disclosure>
          </Stack>
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
                  title="Cancel"
                  onClick={handleReplyFormCanceling}
                />
              }
              onCreate={handleCommentCreation}
            />
          </div>
        </DisclosureContent>
      </Stack>
    </li>
  );
};

export default CommentsListItem;
