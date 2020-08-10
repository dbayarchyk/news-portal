import { Router, Request, Response } from "express";
import {
  CreateSalaryReportController,
  CreateSalaryReportRequestDTO,
  CreateSalaryReportRequestErrorsDTO,
} from "../controllers/create-salary-report-controller";
import { SalaryReportRepository } from "../repositories/salary-report-repository";
import { TechnologyRepository } from "../repositories/technology-repository";
import { CityRepository } from "../repositories/city-repository";
import { SalaryReportDTO } from "../dtos/salary-report-dto";
import { PositionRepository } from "../repositories/position-repository";

const cityRepository = new CityRepository();
const positionRepository = new PositionRepository();
const technologyRepository = new TechnologyRepository();
const salaryReportRepository = new SalaryReportRepository({
  cityRepository,
  positionRepository,
  technologyRepository,
});

const getTechnologiesController = new CreateSalaryReportController({
  cityRepository,
  positionRepository,
  technologyRepository,
  salaryReportRepository,
});

export const router = Router();

router.post(
  "/",
  (
    // eslint-disable-next-line @typescript-eslint/ban-types
    req: Request<{}, {}, CreateSalaryReportRequestDTO>,
    res: Response<SalaryReportDTO | CreateSalaryReportRequestErrorsDTO>
  ) => {
    getTechnologiesController.handle(req, res);
  }
);
