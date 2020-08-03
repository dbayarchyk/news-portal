export interface CommentDTO {
  id: string;
  content: string;
  articleId: string;
  authorId: string;
  parentCommentId: string | null;
  createdAt: string | null;
  updatedAt: string | null;
}
