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

export type CreateCommentRequestDTO = {
  content: string;
  articleId: string;
  authorId: string;
  parentCommentId: string | null;
};

export type CreateCommentValidationErrorsDTO = Partial<
  Record<keyof CreateCommentRequestDTO, string>
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

    const comment = new Comment({
      content: Content.create(rawComment.content),
      articleId: ArticleId.create(rawComment.articleId),
      authorId: AuthorId.create(rawComment.authorId),
      parentCommentId: ParentCommentId.create(rawComment.parentCommentId),
      createdAt: CreatedAt.create(),
      updatedAt: UpdatedAt.create(),
    });

    await this.commentRepository.save(comment);

    const commentDTO = CommentMapper.toDTO(comment);

    res.status(201).send(commentDTO);
  }
}
