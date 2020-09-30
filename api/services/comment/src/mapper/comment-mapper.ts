import { Comment } from "../domain/comment/comment";
import { Content } from "../domain/comment/content";
import { ArticleId } from "../domain/comment/article-id";
import { AuthorId } from "../domain/comment/author-id";
import { UniqueEntityID } from "../shared/domain/unique-entity-id";
import { ParentCommentId } from "../domain/comment/parent-comment-id";
import { Timestamp } from "../domain/comment/timestamp";
import { CommentDTO } from "../application/dto/comment-dto";
import { CommentPersistance } from "../infrastructure/persistence/mongoose/comment-model";

export class CommentMapper {
  public static toEntityFromPersistance(
    commentPersistance: CommentPersistance
  ): Comment {
    const comment = new Comment(
      {
        content: Content.create(commentPersistance.content).value,
        articleId: ArticleId.create(commentPersistance.articleId).value,
        authorId: AuthorId.create(commentPersistance.authorId).value,
        parentCommentId: ParentCommentId.create(
          commentPersistance.parentCommentId
        ).value,
        createdAt: Timestamp.create(commentPersistance.createdAt).value,
        updatedAt: Timestamp.create(commentPersistance.updatedAt).value,
      },
      commentPersistance._id ? new UniqueEntityID(commentPersistance._id) : null
    );

    return comment;
  }

  public static toPersistenceFromEntity(comment: Comment): CommentPersistance {
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

  public static toDTOFromEntity(comment: Comment): CommentDTO {
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
