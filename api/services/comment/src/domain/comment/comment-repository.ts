import { Comment } from "./comment";

export interface CommentRepository {
  findCommentsByArticleId(articleId: string): Promise<Comment[]>;
  save(comment: Comment): Promise<void>;
  exists(comment: Comment): Promise<boolean>;
}
