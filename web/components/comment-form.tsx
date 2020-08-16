import React from "react";
import { useMutation } from "react-query";

import { createComment, Comment } from "../api/comment";
import PrimaryButton from "./ui/buttons/primary-button";
import VisuallyHidden from "./ui/visually-hidden";
import FieldError from "./ui/field-error";
import TextareaInput from "./ui/textarea-input";
import styles from "./comment-form.module.scss";

type CommentFormProps = {
  articleId: string;
  parentCommentId?: string;
  textareaRef?: React.Ref<HTMLTextAreaElement>;
  extraControl?: React.ReactNode;
  onCreate?: (createdComment: Comment) => void;
};

const CommentForm: React.FC<CommentFormProps> = ({
  articleId,
  parentCommentId,
  textareaRef,
  extraControl,
  onCreate,
}) => {
  const [content, setContent] = React.useState("");

  const resetForm = () => {
    setContent("");
    createCommentMutationResult.reset();
  };

  const [
    executeCreateCommentMutation,
    createCommentMutationResult,
  ] = useMutation(createComment, { onSuccess: resetForm });

  const handleTextAreaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setContent(event.target.value);
  };

  const handleSubmissions = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const createdComment = await executeCreateCommentMutation({
      articleId,
      content,
      parentCommentId: parentCommentId || null,
      authorId: "UNKNOWN",
    });

    if (onCreate) {
      onCreate(createdComment);
    }
  };

  const inputId = parentCommentId
    ? `reply-comment-to-${parentCommentId}`
    : "new-comment";

  return (
    <form onSubmit={handleSubmissions}>
      <div>
        <label htmlFor={inputId}>
          <VisuallyHidden>Comment</VisuallyHidden>
        </label>
        <TextareaInput
          className={styles.textarea}
          ref={textareaRef}
          id={inputId}
          placeholder="Type your comment here..."
          name="content"
          value={content}
          aria-invalid={createCommentMutationResult.isError}
          aria-describedby="content-error"
          onChange={handleTextAreaChange}
        />
        {createCommentMutationResult.isError && (
          <FieldError id="content-error" aria-live="assertive" role="alert">
            {"content" in createCommentMutationResult.error
              ? createCommentMutationResult.error["content"]
              : "Something went wrong"}
          </FieldError>
        )}
      </div>

      <div>
        {extraControl}

        <PrimaryButton
          type="submit"
          className={styles.submitButton}
          title={
            createCommentMutationResult.isLoading
              ? "Posting the comment ..."
              : "Leave a comment"
          }
        />
      </div>
    </form>
  );
};

export default CommentForm;
