import { Comment } from "../../domain/comment/comment";
import { CommentDTO } from "../dto/comment-dto";

export class CommentEntityToDTOMapper {
  public static mapEntityToDTO(comment: Comment): CommentDTO {
    const parentCommentId = comment.getParentCommentId();
    const parentCommentIdValue = parentCommentId.getValue();
    const content = comment.getContent();
    const articleId = comment.getArticleId();
    const authorId = comment.getAuthorId();
    const createdAt = comment.getCreatedAt();
    const updatedAt = comment.getUpdatedAt();

    return {
      id: comment.id.toValue(),
      content: content.getValue(),
      articleId: articleId.getValue().toValue(),
      authorId: authorId.getValue().toValue(),
      parentCommentId: parentCommentIdValue
        ? parentCommentIdValue.toValue()
        : null,
      createdAt: createdAt.getValue(),
      updatedAt: updatedAt.getValue(),
    };
  }
}
