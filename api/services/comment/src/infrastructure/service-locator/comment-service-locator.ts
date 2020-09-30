import { inject, injectable } from "inversify";

import { CreateCommentUseCase } from "../../application/use-cases/create-comment";
import { GetCommentsByArticleIdUseCase } from "../../application/use-cases/get-comments-by-article-id";
import { CommentRepository } from "../../domain/comment/comment-repository";
import TYPES from "../ioc/types";

@injectable()
export class CommentServiceLocator {
  public readonly createCommentUseCase: CreateCommentUseCase;
  public readonly getCommentsByArticleIdUseCase: GetCommentsByArticleIdUseCase;

  public constructor(
    @inject(TYPES.CommentRepository) commentRepository: CommentRepository
  ) {
    this.createCommentUseCase = new CreateCommentUseCase(commentRepository);
    this.getCommentsByArticleIdUseCase = new GetCommentsByArticleIdUseCase(
      commentRepository
    );
  }
}
