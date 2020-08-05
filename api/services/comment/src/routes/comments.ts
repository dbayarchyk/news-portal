import { Router, Request, Response } from "express";

import { GetCommentsByArticleIdController } from "../controllers/get-comments-by-article-id-controller";
import {
  CreateCommentController,
  CreateCommentRequestDTO,
} from "../controllers/create-comment-controller";
import { CommentRepository } from "../repositories/comment-repository";

const getCommentsByArticleIdController = new GetCommentsByArticleIdController(
  new CommentRepository()
);
const createCommentController = new CreateCommentController(
  new CommentRepository()
);

export const router = Router();

router.get(
  "/article/:articleId/",
  (req: Request<{ articleId: string }>, res: Response) => {
    getCommentsByArticleIdController.handle(req, res);
  }
);
router.post(
  "/",
  // eslint-disable-next-line @typescript-eslint/ban-types
  (req: Request<{}, {}, CreateCommentRequestDTO>, res: Response) => {
    createCommentController.handle(req, res);
  }
);
