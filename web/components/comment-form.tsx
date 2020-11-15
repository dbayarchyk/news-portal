import React from "react";
import { useMutation } from "react-query";

import { createComment, Comment } from "../api/comment";
import PrimaryButton from "./ui/buttons/primary-button";
import SecondaryButton from "./ui/buttons/secondary-button";
import useForm from "./ui/form/use-form";
import TextareaField from "./ui/fields/textarea-field";
import Stack from "./ui/layouts/stack";
import Cluster from "./ui/layouts/cluster";
import { useAuth } from '../context/auth';
import SignInLink from './sign-in-link';
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
  const auth = useAuth();

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

  if (!auth.isSignedIn) {
    return (
      <SignInLink>
        <SecondaryButton
          className={styles.signInButton}
          tabIndex={-1} title="Sign in to leave a comment"
        />
      </SignInLink>
    )
  }

  return (
    <form onSubmit={formState.onFormSubmit}>
      <Stack scale="2">
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

        <Cluster scale="2">
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
        </Cluster>
      </Stack>
    </form>
  );
};

export default CommentForm;
