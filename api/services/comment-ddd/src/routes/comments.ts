import { Router, Request, Response } from "express";

import { GetCommentsByArticleIdController } from "../controllers/get-comments-by-article-id-controller";
import { CommentRepository } from "../repositories/comment-repository";

export const router = Router();

router.get(
  "/article/:articleId/",
  (req: Request<{ articleId: string }>, res: Response) => {
    const controller = new GetCommentsByArticleIdController(
      new CommentRepository()
    );

    controller.handle(req, res);
  }
);
