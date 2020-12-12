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
import { PositionName } from "../value-objects/position-name";
import { CityName } from "../value-objects/city-name";
import { TechnologyName } from "../value-objects/technology-name";
import { City } from "../entities/city";
import { Technology } from "../entities/technology";
import { Position } from "../entities/position";
import { Result } from "../utils/result";

export interface CreateSalaryReportRequestDTO {
  position: string;
  city: string;
  technology: string;
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
      position: await this.getPosition(rawSalaryReport.position),
      technology: await this.getTechnology(rawSalaryReport.technology),
      city: await this.getCity(rawSalaryReport.city),
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
        position: position,
        city: city,
        technology: technology,
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

  private async getCity(rawCityName: string): Promise<Result<City, string>> {
    if (!rawCityName) {
      return Result.fail(`Please provide the city`);
    }

    let city = await this.cityRepository.findCityByName(rawCityName);

    if (city === null) {
      const cityNameOrError = CityName.create(rawCityName);

      if (cityNameOrError.checkStatus("failure")) {
        return Result.fail(cityNameOrError.error);
      }

      const cityName = cityNameOrError.value;
      city = new City({ name: cityName });
      this.cityRepository.save(city);
    }

    return Result.ok(city);
  }

  private async getTechnology(
    rawTechnologyName: string
  ): Promise<Result<Technology, string>> {
    if (!rawTechnologyName) {
      return Result.fail(`Please provide the technology`);
    }

    let technology = await this.technologyRepository.findTechnologyByName(rawTechnologyName);

    if (technology === null) {
      const technologyNameOrError = TechnologyName.create(rawTechnologyName);

      if (technologyNameOrError.checkStatus("failure")) {
        return Result.fail(technologyNameOrError.error);
      }

      const technologyName = technologyNameOrError.value;
      technology = new Technology({ name: technologyName });
      this.technologyRepository.save(technology);
    }

    return Result.ok(technology);
  }

  private async getPosition(
    rawPositionName: string
  ): Promise<Result<Position, string>> {
    if (!rawPositionName) {
      return Result.fail(`Please provide the position`);
    }

    let position = await this.positionRepository.findPositionByName(rawPositionName);

    if (position === null) {
      const positionNameOrError = PositionName.create(rawPositionName);

      if (positionNameOrError.checkStatus("failure")) {
        return Result.fail(positionNameOrError.error);
      }

      const positionName = positionNameOrError.value;
      position = new Position({ name: positionName });
      this.positionRepository.save(position);
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
