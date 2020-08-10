import { SalaryReport as SalaryReportModel } from "../database/models/salary-report";
import { SalaryReport } from "../entities/salary-report";
import { SalaryReportMapper } from "../mappers/salary-report-mapper";
import { ICityRepository } from "../repositories/city-repository";
import { IPositionRepository } from "../repositories/position-repository";
import { ITechnologyRepository } from "../repositories/technology-repository";

export interface ISalaryReportRepository {
  save(salaryReport: SalaryReport): Promise<void>;
  exists(salaryReport: SalaryReport): Promise<boolean>;
}

interface SalaryReportRepositoryProps {
  cityRepository: ICityRepository;
  positionRepository: IPositionRepository;
  technologyRepository: ITechnologyRepository;
}

export class SalaryReportRepository implements ISalaryReportRepository {
  private cityRepository: ICityRepository;
  private positionRepository: IPositionRepository;
  private technologyRepository: ITechnologyRepository;

  public constructor(props: SalaryReportRepositoryProps) {
    this.cityRepository = props.cityRepository;
    this.positionRepository = props.positionRepository;
    this.technologyRepository = props.technologyRepository;
  }

  public async save(salaryReport: SalaryReport): Promise<void> {
    await this.cityRepository.save(salaryReport.city);
    await this.positionRepository.save(salaryReport.position);
    await this.technologyRepository.save(salaryReport.technology);

    const salaryReportExists = await this.exists(salaryReport);
    const salaryReportPersistence = SalaryReportMapper.toPersistence(
      salaryReport
    );

    if (salaryReportExists) {
      await SalaryReportModel.update(
        { _id: salaryReport.id.value },
        salaryReportPersistence
      );
    } else {
      await SalaryReportModel.create(salaryReportPersistence);
    }
  }

  public async exists(salaryReport: SalaryReport): Promise<boolean> {
    const rawSalaryReport = await SalaryReportModel.findById(
      salaryReport.id.value
    ).lean();

    if (rawSalaryReport === null) {
      return false;
    }

    return true;
  }
}
