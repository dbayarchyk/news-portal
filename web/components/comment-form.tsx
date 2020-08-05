import React from "react";
import { useMutation } from "react-query";

import { createComment, Comment } from "../api/comment";

type CommentFormProps = {
  articleId: string;
  parentCommentId?: string;
  onCreate?: (createdComment: Comment) => void;
};

const CommentForm: React.FC<CommentFormProps> = ({
  articleId,
  parentCommentId,
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
    ? "new-comment"
    : `reply-comment-to-${parentCommentId}`;

  return (
    <form onSubmit={handleSubmissions}>
      <div>
        <label htmlFor={inputId}>
          <div>Comment</div>
        </label>
        <textarea
          id={inputId}
          placeholder="Type your comment here..."
          name="content"
          value={content}
          aria-invalid={createCommentMutationResult.isError}
          aria-describedby="content-error"
          onChange={handleTextAreaChange}
        />
        {createCommentMutationResult.isError && (
          <p id="content-error" aria-live="assertive" role="alert">
            {"content" in createCommentMutationResult.error
              ? createCommentMutationResult.error["content"]
              : "Something went wrong"}
          </p>
        )}
      </div>

      <div>
        <button type="submit">
          {createCommentMutationResult.isLoading
            ? "Posting the comment ..."
            : "Leave a comment"}
        </button>
      </div>
    </form>
  );
};

export default CommentForm;
