import { Comment } from "../entities/comment";
import { Content } from "../value-objects/content";
import { ArticleId } from "../value-objects/article-id";
import { AuthorId } from "../value-objects/author-id";
import { UniqueId } from "../value-objects/unique-id";
import { ParentCommentId } from "../value-objects/parent-comment-id";
import { CreatedAt } from "../value-objects/created-at";
import { UpdatedAt } from "../value-objects/updated-at";
import { CommentDTO } from "../dtos/comment-dto";
import { CommentPersistance } from "../database/models/comment";

export class CommentMapper {
  public static toEntity(raw: CommentPersistance): Comment {
    const comment = new Comment(
      {
        content: Content.create(raw.content).value,
        articleId: ArticleId.create(raw.articleId).value,
        authorId: AuthorId.create(raw.authorId).value,
        parentCommentId: ParentCommentId.create(raw.parentCommentId).value,
        createdAt: CreatedAt.create(raw.createdAt),
        updatedAt: UpdatedAt.create(raw.updatedAt),
      },
      raw._id ? UniqueId.create(raw._id) : null
    );

    return comment;
  }

  public static toPersistence(comment: Comment): CommentPersistance {
    return {
      _id: comment.id.value,
      content: comment.content.value,
      articleId: comment.articleId.value,
      authorId: comment.authorId.value,
      parentCommentId: comment.parentCommentId.value,
      createdAt: comment.createdAt.value,
      updatedAt: comment.updatedAt.value,
    };
  }

  public static toDTO(comment: Comment): CommentDTO {
    return {
      id: comment.id.value,
      content: comment.content.value,
      articleId: comment.articleId.value,
      authorId: comment.authorId.value,
      parentCommentId: comment.parentCommentId.value,
      createdAt: comment.createdAt.value,
      updatedAt: comment.updatedAt.value,
    };
  }
}
