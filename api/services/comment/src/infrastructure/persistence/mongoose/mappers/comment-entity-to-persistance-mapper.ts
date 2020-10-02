import { Comment } from "../../../../domain/comment/comment";
import { CommentPersistance } from "../comment-model";

export class CommentEntityToPersistanceMapper {
  public static mapEntityToPersistance(comment: Comment): CommentPersistance {
    const parentCommentId = comment.getParentCommentId();
    const parentCommentIdValue = parentCommentId.getValue();

    return {
      _id: comment.id.toString(),
      content: comment.getContent().getValue(),
      articleId: comment.getArticleId().getValue().toValue(),
      authorId: comment.getAuthorId().getValue().toValue(),
      parentCommentId: parentCommentIdValue
        ? parentCommentIdValue.toValue()
        : null,
      createdAt: comment.getCreatedAt().getValue(),
      updatedAt: comment.getUpdatedAt().getValue(),
    };
  }
}
