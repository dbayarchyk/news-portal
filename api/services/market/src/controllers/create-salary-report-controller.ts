import { Request, Response } from "express";
import { Controller } from "../controllers/controller";
import { ISalaryReportRepository } from "../repositories/salary-report-repository";
import { ICityRepository } from "../repositories/city-repository";
import { ITechnologyRepository } from "../repositories/technology-repository";
import { IPositionRepository } from "../repositories/position-repository";
import { SalaryReportMapper } from "../mappers/salary-report-mapper";
import { SalaryReportDTO } from "../dtos/salary-report-dto";
import { SalaryReport } from "../entities/salary-report";
import { CreatedAt } from "../value-objects/created-at";
import { WorkExperience } from "../value-objects/work-experience";
import { AnnualSalary } from "../value-objects/annual-salary";
import { City } from "../entities/city";
import { Technology } from "../entities/technology";
import { Position } from "../entities/position";
import { Result } from "../utils/result";

export interface CreateSalaryReportRequestDTO {
  positionId: string;
  cityId: string;
  technologyId: string;
  workExperience: number;
  annualSalary: number;
}

export type CreateSalaryReportRequestErrorsDTO = Partial<
  Record<keyof CreateSalaryReportRequestDTO, string>
>;

interface CreateSalaryReportControllerProps {
  salaryReportRepository: ISalaryReportRepository;
  cityRepository: ICityRepository;
  technologyRepository: ITechnologyRepository;
  positionRepository: IPositionRepository;
}

type CombinedResult<TRecordKey extends string> = Record<
  TRecordKey,
  Result<unknown, unknown>
>;

export class CreateSalaryReportController extends Controller {
  private salaryReportRepository: ISalaryReportRepository;
  private cityRepository: ICityRepository;
  private positionRepository: IPositionRepository;
  private technologyRepository: ITechnologyRepository;

  public constructor(props: CreateSalaryReportControllerProps) {
    super();
    this.salaryReportRepository = props.salaryReportRepository;
    this.cityRepository = props.cityRepository;
    this.technologyRepository = props.technologyRepository;
    this.positionRepository = props.positionRepository;
  }

  public async handle(
    // eslint-disable-next-line @typescript-eslint/ban-types
    req: Request<{}, {}, CreateSalaryReportRequestDTO>,
    res: Response<SalaryReportDTO | CreateSalaryReportRequestErrorsDTO>
  ): Promise<void> {
    const rawSalaryReport = req.body;

    const combinedSalaryReportPropsResult = Result.combine({
      position: await this.getPosition(rawSalaryReport.positionId),
      technology: await this.getTechnology(rawSalaryReport.technologyId),
      city: await this.getCity(rawSalaryReport.cityId),
      workExperience: WorkExperience.create(rawSalaryReport.workExperience),
      annualSalary: AnnualSalary.create(rawSalaryReport.annualSalary),
    });

    if (combinedSalaryReportPropsResult.checkStatus("failure")) {
      const {
        position,
        city,
        technology,
        ...validationErrors
      } = this.deriveErrorsFromFailedCombinedResult(
        combinedSalaryReportPropsResult.error as CombinedResult<
          keyof typeof combinedSalaryReportPropsResult.error
        >
      );

      res.status(422).send({
        positionId: position,
        cityId: city,
        technologyId: technology,
        ...validationErrors,
      });
      return;
    }

    const salaryReportOrError = SalaryReport.create({
      city: combinedSalaryReportPropsResult.value.city.value,
      position: combinedSalaryReportPropsResult.value.position.value,
      technology: combinedSalaryReportPropsResult.value.technology.value,
      workExperience:
        combinedSalaryReportPropsResult.value.workExperience.value,
      annualSalary: combinedSalaryReportPropsResult.value.annualSalary.value,
      createdAt: CreatedAt.create(),
    });

    if (salaryReportOrError.checkStatus("failure")) {
      res.status(500).send(salaryReportOrError.error);
    }

    const salaryReport = salaryReportOrError.value;

    await this.salaryReportRepository.save(salaryReport);

    const salaryDTO = SalaryReportMapper.toDTO(salaryReport);

    res.status(201).send(salaryDTO);
  }

  private async getCity(cityId: string): Promise<Result<City, string>> {
    const city = await this.cityRepository.findCityById(cityId);

    if (city === null) {
      return Result.fail(`City with id "${cityId}" does not exist`);
    }

    return Result.ok(city);
  }

  private async getTechnology(
    technologyId: string
  ): Promise<Result<Technology, string>> {
    const technology = await this.technologyRepository.findTechnologyById(
      technologyId
    );

    if (technology === null) {
      return Result.fail(`Technology with id "${technologyId}" does not exist`);
    }

    return Result.ok(technology);
  }

  private async getPosition(
    positionId: string
  ): Promise<Result<Position, string>> {
    const position = await this.positionRepository.findPositionById(positionId);

    if (position === null) {
      return Result.fail(`Position with id "${positionId}" does not exist`);
    }

    return Result.ok(position);
  }

  private deriveErrorsFromFailedCombinedResult<
    T extends CombinedResult<string>
  >(combinedResultError: T): Record<keyof T, string> {
    const validationErrors = Object.entries(combinedResultError).reduce(
      (errors, [key, failedResult]) => {
        if (!failedResult) {
          return errors;
        }

        return {
          ...errors,
          [key]: failedResult.error,
        };
      },
      {} as Record<keyof T, string>
    );

    return validationErrors;
  }
}
