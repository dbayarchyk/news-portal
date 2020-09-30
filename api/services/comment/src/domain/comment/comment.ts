import { Entity } from "../../shared/domain//entity";
import { UniqueEntityID } from "../../shared/domain//unique-entity-id";
import { Content } from "./content";
import { Timestamp } from "./timestamp";
import { ParentCommentId } from "./parent-comment-id";
import { ArticleId } from "./article-id";
import { AuthorId } from "./author-id";

interface CommentData {
  content: Content;
  parentCommentId: ParentCommentId;
  authorId: AuthorId;
  articleId: ArticleId;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export class Comment extends Entity {
  private content: Content;
  private parentCommentId: ParentCommentId;
  private articleId: ArticleId;
  private authorId: AuthorId;
  private createdAt: Timestamp;
  private updatedAt: Timestamp;

  public constructor(data: CommentData, id?: UniqueEntityID | null) {
    super(id);

    this.content = data.content;
    this.parentCommentId = data.parentCommentId;
    this.articleId = data.articleId;
    this.authorId = data.authorId;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

  public getContent(): Content {
    return this.content;
  }

  public getArticleId(): ArticleId {
    return this.articleId;
  }

  public getAuthorId(): AuthorId {
    return this.authorId;
  }

  public getParentCommentId(): ParentCommentId {
    return this.parentCommentId;
  }

  public getCreatedAt(): Timestamp {
    return this.createdAt;
  }

  public getUpdatedAt(): Timestamp {
    return this.updatedAt;
  }
}
