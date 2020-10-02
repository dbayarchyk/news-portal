import { Request, Response } from "express";
import { inject } from "inversify";
import {
  BaseHttpController,
  controller,
  httpPost,
  httpGet,
} from "inversify-express-utils";

import TYPES from "../../ioc/types";
import { CommentServiceLocator } from "../../service-locators/comment-service-locator";

@controller("/comments")
export class CommentController extends BaseHttpController {
  public constructor(
    @inject(TYPES.CommentServiceLocator)
    private readonly commentService: CommentServiceLocator
  ) {
    super();
  }

  @httpPost("/")
  public async createComment(req: Request, res: Response): Promise<void> {
    const result = await this.commentService.createCommentUseCase.execute(
      req.body
    );

    if (result.checkStatus("failure")) {
      const validationErrors = result.error;

      res.status(422).send(validationErrors);

      return;
    }

    const commentDTO = result.value;

    res.status(201);
    res.json(commentDTO);
  }

  @httpGet("/article/:articleId/")
  public async getCommentsByArticleId(
    req: Request,
    res: Response
  ): Promise<void> {
    const comments = await this.commentService.getCommentsByArticleIdUseCase.execute(
      {
        articleId: req.params.articleId,
      }
    );

    // res.setHeader("Cache-Control", "max-age=300");
    res.status(200);
    res.json({
      items: comments,
    });
  }
}
