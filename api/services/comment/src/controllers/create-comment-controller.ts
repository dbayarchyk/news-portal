import { Request, Response } from "express";
import { Controller } from "../controllers/controller";
import { ICommentRepository } from "../repositories/comment-repository";
import { CommentMapper } from "../mappers/comment-mapper";
import { CommentDTO } from "../dtos/comment-dto";
import { Comment } from "../entities/comment";
import { Content } from "../value-objects/content";
import { AuthorId } from "../value-objects/author-id";
import { ArticleId } from "../value-objects/article-id";
import { ParentCommentId } from "../value-objects/parent-comment-id";
import { CreatedAt } from "../value-objects/created-at";
import { UpdatedAt } from "../value-objects/updated-at";
import { Result } from "../utils/result";

export type CreateCommentRequestDTO = {
  content: string;
  articleId: string;
  authorId: string;
  parentCommentId: string | null;
};

export type CreateCommentValidationErrorsDTO = Partial<
  Record<keyof CreateCommentRequestDTO, string>
>;

type CombinedResult<TRecordKey extends string> = Record<
  TRecordKey,
  Result<unknown, unknown>
>;

export class CreateCommentController extends Controller {
  private commentRepository: ICommentRepository;

  public constructor(commentRepository: ICommentRepository) {
    super();
    this.commentRepository = commentRepository;
  }

  public async handle(
    // eslint-disable-next-line @typescript-eslint/ban-types
    req: Request<{}, {}, CreateCommentRequestDTO>,
    res: Response<CommentDTO | CreateCommentValidationErrorsDTO>
  ): Promise<void> {
    const rawComment = req.body;

    const combinedCommentPropsResult = Result.combine({
      content: Content.create(rawComment.content),
      articleId: ArticleId.create(rawComment.articleId),
      authorId: AuthorId.create(rawComment.authorId),
      parentCommentId: ParentCommentId.create(rawComment.parentCommentId),
    });

    if (combinedCommentPropsResult.checkStatus("failure")) {
      const validationErrors = this.deriveErrorsFromFailedCombinedResult(
        combinedCommentPropsResult.error as CombinedResult<
          keyof typeof combinedCommentPropsResult.error
        >
      );

      res.status(422).send(validationErrors);
      return;
    }

    const commentProps = combinedCommentPropsResult.value;
    const comment = new Comment({
      content: commentProps.content.value,
      articleId: commentProps.articleId.value,
      authorId: commentProps.authorId.value,
      parentCommentId: commentProps.parentCommentId.value,
      createdAt: CreatedAt.create(),
      updatedAt: UpdatedAt.create(),
    });

    await this.commentRepository.save(comment);

    const commentDTO = CommentMapper.toDTO(comment);

    res.status(201).send(commentDTO);
  }

  private deriveErrorsFromFailedCombinedResult<
    T extends CombinedResult<string>
  >(combinedResultError: T): Record<keyof T, string> {
    const validationErrors = Object.entries(combinedResultError).reduce(
      (errors, [key, failedResult]) => {
        if (!failedResult) {
          return errors;
        }

        return {
          ...errors,
          [key]: failedResult.error,
        };
      },
      {} as Record<keyof T, string>
    );

    return validationErrors;
  }
}
