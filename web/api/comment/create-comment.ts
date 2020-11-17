import type { Comment } from './get-comments-by-article-id';

export type CreateCommentData = {
  content: string;
  articleId: string;
  authorId: string;
  parentCommentId: string | null;
};

const createComment = async (
  fetch: typeof window.fetch,
  data: CreateCommentData
): Promise<Comment | never> => {
  const response = await fetch("/comments/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  switch (response.status) {
    case 201: {
    return response.json();
    }

    case 422: {
    throw await response.json();
    }

    default: {
    throw new Error(`Unsupported response status: ${response.status}`);
    }
 }
};

export default createComment;
