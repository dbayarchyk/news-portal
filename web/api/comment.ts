import "isomorphic-fetch";

const COMMENT_SERVICE_API = "/api/comment";

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
  const data = await response.json();

  switch (response.status) {
    case 200: {
      return data;
    }

    default: {
      throw new Error();
    }
  }
};
