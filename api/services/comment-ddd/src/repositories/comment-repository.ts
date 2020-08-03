import { Comment as CommentModel } from "../database/models/comment";
import { Comment } from "../entities/comment";
import { CommentMapper } from "../mappers/comment-mapper";

export interface ICommentRepository {
  findCommentsByArticleId(articleId: string): Promise<Comment[]>;
  save(comment: Comment): Promise<void>;
  exists(comment: Comment): Promise<boolean>;
}

export class CommentRepository implements ICommentRepository {
  public async findCommentsByArticleId(articleId: string): Promise<Comment[]> {
    const rawComments = await CommentModel.find({
      articleId: articleId,
    })
      .sort({ createdAt: "asc" })
      .lean();

    return rawComments.map((rawComment) => CommentMapper.toEntity(rawComment));
  }

  public async save(comment: Comment): Promise<void> {
    const commentExists = await this.exists(comment);
    const commentPersistence = CommentMapper.toPersistence(comment);

    if (commentExists) {
      await CommentModel.update({ _id: comment.id.value }, commentPersistence);
    } else {
      await CommentModel.create(commentPersistence);
    }
  }

  public async exists(comment: Comment): Promise<boolean> {
    const rawComment = await CommentModel.findById(comment.id.value).lean();

    if (rawComment === null) {
      return false;
    }

    return true;
  }
}
