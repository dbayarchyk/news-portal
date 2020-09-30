import { injectable } from "inversify";

import { CommentRepository } from "../../../domain/comment/comment-repository";
import { Comment } from "../../../domain/comment/comment";
import { CommentModel } from "./comment-model";
import { CommentMapper } from "../../../mapper/comment-mapper";

@injectable()
export class CommentRepositoryMongoose implements CommentRepository {
  public async findCommentsByArticleId(articleId: string): Promise<Comment[]> {
    const rawComments = await CommentModel.find({
      articleId: articleId,
    })
      .sort({ createdAt: "asc" })
      .lean();

    return rawComments.map((rawComment) =>
      CommentMapper.toEntityFromPersistance(rawComment)
    );
  }

  public async save(comment: Comment): Promise<void> {
    const commentExists = await this.exists(comment);
    const commentPersistence = CommentMapper.toPersistenceFromEntity(comment);

    if (commentExists) {
      await CommentModel.update(
        { _id: comment.id.toValue() },
        commentPersistence
      );
    } else {
      await CommentModel.create(commentPersistence);
    }
  }

  public async exists(comment: Comment): Promise<boolean> {
    const rawComment = await CommentModel.findById(comment.id.toValue()).lean();

    if (rawComment === null) {
      return false;
    }

    return true;
  }
}
