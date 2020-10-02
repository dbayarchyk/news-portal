import { Comment } from "../../domain/comment/comment";
import { CommentDTO } from "../dto/comment-dto";

export class CommentEntityToDTOMapper {
  public static mapEntityToDTO(comment: Comment): CommentDTO {
    const parentCommentId = comment.getParentCommentId();
    const parentCommentIdValue = parentCommentId.getValue();

    return {
      id: comment.id.toValue(),
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
