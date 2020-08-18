import React from "react";
import { useMutation } from "react-query";

import { createComment, Comment } from "../api/comment";
import PrimaryButton from "./ui/buttons/primary-button";
import useForm from "./ui/form/use-form";
import TextareaField from "./ui/fields/textarea-field";
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
  const formState = useForm({
    initialValues: { content: "" },
    onSubmit: async (values) => {
      const createdComment = await executeCreateCommentMutation({
        articleId,
        content: values.content,
        parentCommentId: parentCommentId || null,
        authorId: "UNKNOWN",
      });

      if (onCreate) {
        onCreate(createdComment);
      }
    },
  });

  const resetForm = () => {
    formState.resetForm();
    createCommentMutationResult.reset();
  };

  const [
    executeCreateCommentMutation,
    createCommentMutationResult,
  ] = useMutation(createComment, {
    onError: (error) => {
      if ("content" in error) {
        throw error;
      }

      throw { content: "Something went wrong." };
    },
    onSuccess: resetForm,
  });

  const inputId = parentCommentId
    ? `reply-comment-to-${parentCommentId}`
    : "new-comment";

  return (
    <form onSubmit={formState.onFormSubmit}>
      <TextareaField
        textareaRef={textareaRef}
        label="New comment"
        name="content"
        id={inputId}
        placeholder="Type your comment here..."
        value={formState.values.content}
        errorMessage={formState.errors.content}
        onChange={formState.onFieldValueChange}
        onBlur={formState.onFieldBlur}
      />

      <div>
        {extraControl}

        <PrimaryButton
          type="submit"
          className={styles.submitButton}
          title={
            formState.isSubmitting
              ? "Posting the comment ..."
              : "Leave a comment"
          }
        />
      </div>
    </form>
  );
};

export default CommentForm;
