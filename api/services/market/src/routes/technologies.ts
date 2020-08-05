import { Router, Request, Response } from "express";
import { GetTechnologiesController } from "../controllers/get-technologies-controller";
import { TechnologyRepository } from "../repositories/technology-repository";
import { TechnologyCollectionDTO } from "../dtos/technology-dto";

const getTechnologiesController = new GetTechnologiesController(
  new TechnologyRepository()
);

export const router = Router();

router.get("/", (req: Request, res: Response<TechnologyCollectionDTO>) => {
  getTechnologiesController.handle(req, res);
});
