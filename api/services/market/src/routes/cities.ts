import { Router, Request, Response } from "express";
import { GetCitiesController } from "../controllers/get-cities-controller";
import { CityRepository } from "../repositories/city-repository";
import { CityCollectionDTO } from "../dtos/city-dto";

const getCitiesController = new GetCitiesController(new CityRepository());

export const router = Router();

router.get("/", (req: Request, res: Response<CityCollectionDTO>) => {
  getCitiesController.handle(req, res);
});
