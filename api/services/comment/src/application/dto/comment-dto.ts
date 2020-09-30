export interface CommentDTO {
  readonly id: string;
  readonly content: string;
  readonly articleId: string;
  readonly authorId: string;
  readonly parentCommentId: string | null;
  readonly createdAt: string;
  readonly updatedAt: string;
}
