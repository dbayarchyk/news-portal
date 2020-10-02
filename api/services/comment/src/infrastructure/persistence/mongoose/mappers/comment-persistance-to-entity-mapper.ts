import { Comment } from "../../../../domain/comment/comment";
import { Content } from "../../../../domain/comment/content";
import { ArticleId } from "../../../../domain/comment/article-id";
import { AuthorId } from "../../../../domain/comment/author-id";
import { UniqueEntityID } from "../../../../shared/domain/unique-entity-id";
import { ParentCommentId } from "../../../../domain/comment/parent-comment-id";
import { Timestamp } from "../../../../domain/comment/timestamp";
import { CommentPersistance } from "../comment-model";

export class CommentPersistanceToEntityMapper {
  public static mapPersistanceToEntity(
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
}
