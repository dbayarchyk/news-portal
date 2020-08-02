import { Comment as CommentModel } from "../database/models/comment";
import { Comment } from "../entities/comment";
import { CommentMapper } from "../mappers/comment-mapper";

export interface ICommentRepository {
  findCommentsByArticleId(articleId: string): Promise<Comment[]>;
}

export class CommentRepository implements ICommentRepository {
  public async findCommentsByArticleId(articleId: string): Promise<Comment[]> {
    const comments = await CommentModel.find({ articleId: articleId }).lean();

    return comments.map((comment) => CommentMapper.toEntity(comment));
  }
}
