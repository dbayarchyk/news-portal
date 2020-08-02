import { Request, Response } from "express";
import { Controller } from "../controllers/controller";
import { ICommentRepository } from "../repositories/comment-repository";
import { CommentMapper } from "../mappers/comment-mapper";
import { CommentDTO } from "../dtos/comment-dto";

type Params = {
  articleId: string;
};

type ResponseBody = {
  items: CommentDTO[];
};

export class GetCommentsByArticleIdController extends Controller {
  private commentRepository: ICommentRepository;

  public constructor(commentRepository: ICommentRepository) {
    super();
    this.commentRepository = commentRepository;
  }

  public async handle(
    req: Request<Params>,
    res: Response<ResponseBody>
  ): Promise<void> {
    const articleId = req.params.articleId;

    const comments = await this.commentRepository.findCommentsByArticleId(
      articleId
    );
    const commentsDTO = comments.map((comment) => CommentMapper.toDTO(comment));

    res.setHeader("Cache-Control", "max-age=300");
    res.status(200);
    res.json({
      items: commentsDTO,
    });
  }
}
