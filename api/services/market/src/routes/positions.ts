import { Router, Request, Response } from "express";
import { GetPositionsController } from "../controllers/get-positions-controller";
import { PositionRepository } from "../repositories/position-repository";
import { PositionCollectionDTO } from "../dtos/position-dto";

const getPositionsController = new GetPositionsController(
  new PositionRepository()
);

export const router = Router();

router.get("/", (req: Request, res: Response<PositionCollectionDTO>) => {
  getPositionsController.handle(req, res);
});
