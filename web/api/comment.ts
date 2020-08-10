import "isomorphic-fetch";

const COMMENT_SERVICE_API = "http://localhost:8000";

export type Comment = {
  id: string;
  content: string;
  articleId: string;
  authorId: string;
  parentCommentId: string | null;
  createdAt: string;
  updatedAt: string;
};

type CommentCollection = {
  items: Comment[];
};

export const getCommentsByArticleId = async (
  articleId: string
): Promise<CommentCollection> => {
  const response = await fetch(
    `${COMMENT_SERVICE_API}/comments/article/${articleId}/`
  );

  switch (response.status) {
    case 200: {
      return response.json();
    }

    default: {
      throw new Error(`Unsupported response status: ${response.status}`);
    }
  }
};

type CreateCommentData = {
  content: string;
  articleId: string;
  authorId: string;
  parentCommentId: string | null;
};

export const createComment = async (
  data: CreateCommentData
): Promise<Comment | never> => {
  const response = await fetch(`${COMMENT_SERVICE_API}/comments/`, {
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
