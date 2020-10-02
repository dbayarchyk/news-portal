import { CommentRepository } from "../../../../domain/comment/comment-repository";
import { Comment } from "../../../../domain/comment/comment";

export class MockCommentRepository implements CommentRepository {
  private comments = new Map<string, Comment>();

  public async findCommentsByArticleId(articleId: string): Promise<Comment[]> {
    const filteredComments = Array.from(this.comments.values()).filter(
      (comment) => comment.getArticleId().getValue().toValue() === articleId
    );

    return filteredComments;
  }

  public async save(comment: Comment): Promise<void> {
    this.comments.set(comment.id.toValue(), comment);
  }

  public async exists(comment: Comment): Promise<boolean> {
    return this.comments.get(comment.id.toValue()) !== null;
  }
}
