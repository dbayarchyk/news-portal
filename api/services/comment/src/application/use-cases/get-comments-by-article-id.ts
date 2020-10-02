import { UseCase } from "../../shared/domain/use-case";
import { CommentRepository } from "../../domain/comment/comment-repository";
import { CommentDTO } from "../../application/dto/comment-dto";
import { CommentEntityToDTOMapper } from "../mappers/comment-entity-to-dto-mapper";

export interface GetCommentsByArticleIdRequest {
  articleId: string;
}

export type GetCommentsByArticleIdResponse = CommentDTO[];

export class GetCommentsByArticleIdUseCase
  implements
    UseCase<
      GetCommentsByArticleIdRequest,
      Promise<GetCommentsByArticleIdResponse>
    > {
  public constructor(private readonly commentRepository: CommentRepository) {}

  public async execute(
    request: GetCommentsByArticleIdRequest
  ): Promise<GetCommentsByArticleIdResponse> {
    const comments = await this.commentRepository.findCommentsByArticleId(
      request.articleId
    );

    return comments.map((comment) =>
      CommentEntityToDTOMapper.mapEntityToDTO(comment)
    );
  }
}
