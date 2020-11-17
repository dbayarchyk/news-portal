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
  
const getCommentsByArticleId = async (
  fetch: typeof window.fetch,
  articleId: string
): Promise<CommentCollection> => {
  const response = await fetch(
    `/comment/comments/article/${articleId}/`
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

export default getCommentsByArticleId;
