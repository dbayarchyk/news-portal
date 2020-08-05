import { Entity } from "../entities/entity";
import { Content } from "../value-objects/content";
import { ArticleId } from "../value-objects/article-id";
import { AuthorId } from "../value-objects/author-id";
import { UniqueId } from "../value-objects/unique-id";
import { ParentCommentId } from "../value-objects/parent-comment-id";
import { CreatedAt } from "../value-objects/created-at";
import { UpdatedAt } from "../value-objects/updated-at";

interface CommentProps {
  content: Content;
  authorId: AuthorId;
  articleId: ArticleId;
  parentCommentId: ParentCommentId;
  createdAt: CreatedAt;
  updatedAt: UpdatedAt;
}

export class Comment extends Entity<CommentProps> {
  public get id(): UniqueId {
    return this._id;
  }

  public get content(): Content {
    return this.props.content;
  }

  public get authorId(): AuthorId {
    return this.props.authorId;
  }

  public get articleId(): ArticleId {
    return this.props.articleId;
  }

  public get parentCommentId(): ParentCommentId {
    return this.props.parentCommentId;
  }

  public get createdAt(): CreatedAt {
    return this.props.createdAt;
  }

  public get updatedAt(): UpdatedAt {
    return this.props.updatedAt;
  }

  public constructor(props: CommentProps, id?: UniqueId | null) {
    super(props, id);
  }
}
