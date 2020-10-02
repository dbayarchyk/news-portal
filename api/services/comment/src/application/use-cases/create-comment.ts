import { Comment } from "../../domain/comment/comment";
import { Content } from "../../domain/comment/content";
import { Timestamp } from "../../domain/comment/timestamp";
import { ArticleId } from "../../domain/comment/article-id";
import { AuthorId } from "../../domain/comment/author-id";
import { ParentCommentId } from "../../domain/comment/parent-comment-id";
import { UseCase } from "../../shared/domain/use-case";
import { CommentRepository } from "../../domain/comment/comment-repository";
import { Result } from "../../shared/logic/result";
import { CommentDTO } from "../dto/comment-dto";
import { CommentEntityToDTOMapper } from "../mappers/comment-entity-to-dto-mapper";

interface CreateCommentRequest {
  content: string;
  articleId: string;
  authorId: string;
  parentCommentId: string | null;
}

type CreateCommentValidationErrors = Partial<
  Record<keyof CreateCommentRequest, string>
>;

type CreateCommentResponse = Result<CommentDTO, CreateCommentValidationErrors>;

export class CreateCommentUseCase
  implements UseCase<CreateCommentRequest, Promise<CreateCommentResponse>> {
  public constructor(private readonly commentRepository: CommentRepository) {}

  public async execute(
    request: CreateCommentRequest
  ): Promise<CreateCommentResponse> {
    const commentOrError = this.createCommentOrError(request);

    if (commentOrError.checkStatus("failure")) {
      return Result.fail(this.deriveCombinedErrors(commentOrError.error));
    }

    const comment = commentOrError.value;

    await this.commentRepository.save(comment);

    const commentDTO = CommentEntityToDTOMapper.mapEntityToDTO(comment);

    return Result.ok(commentDTO);
  }

  private createCommentOrError(request: CreateCommentRequest) {
    const commentDataOrError = this.createCommentDataOrError(request);

    if (commentDataOrError.checkStatus("failure")) {
      return Result.fail(commentDataOrError.error);
    }

    const commentData = commentDataOrError.value;
    const comment = new Comment({
      content: commentData.content.value,
      articleId: commentData.articleId.value,
      authorId: commentData.authorId.value,
      parentCommentId: commentData.parentCommentId.value,
      createdAt: commentData.createdAt.value,
      updatedAt: commentData.updatedAt.value,
    });

    return Result.ok(comment);
  }

  private createCommentDataOrError(request: CreateCommentRequest) {
    const commentDataOrError = Result.combine({
      content: Content.create(request.content),
      articleId: ArticleId.create(request.articleId),
      authorId: AuthorId.create(request.authorId),
      parentCommentId: ParentCommentId.create(request.parentCommentId),
      createdAt: Timestamp.create(),
      updatedAt: Timestamp.create(),
    });

    return commentDataOrError;
  }

  private deriveCombinedErrors(
    combinedErrors: Partial<
      Record<keyof CreateCommentRequest, Result<unknown, string | never>>
    >
  ): CreateCommentValidationErrors {
    const validationErrors = Object.keys(combinedErrors).reduce(
      (errors, field: keyof CreateCommentRequest) => {
        const failedResult = combinedErrors[field];

        if (!failedResult) {
          return errors;
        }

        return {
          ...errors,
          [field]: failedResult.error,
        };
      },
      {} as CreateCommentValidationErrors
    );

    return validationErrors;
  }
}
