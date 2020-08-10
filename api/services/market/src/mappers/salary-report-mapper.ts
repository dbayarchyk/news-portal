import { SalaryReport } from "../entities/salary-report";
import { UniqueId } from "../value-objects/unique-id";
import { CreatedAt } from "../value-objects/created-at";
import { AnnualSalary } from "../value-objects/annual-salary";
import { WorkExperience } from "../value-objects/work-experience";
import { SalaryReportDTO } from "../dtos/salary-report-dto";
import { CityPersistance } from "../database/models/city";
import { PositionPersistance } from "../database/models/position";
import { TechnologyPersistance } from "../database/models/technology";
import { CityMapper } from "./city-mapper";
import { TechnologyMapper } from "./technology-mapper";
import { PositionMapper } from "./position-mapper";
import { SalaryReportPersistance } from "../database/models/salary-report";

export type SalaryReportRawToEntity = Omit<
  SalaryReportPersistance,
  "positionId" | "cityId" | "technologyId"
> & {
  position: PositionPersistance;
  city: CityPersistance;
  technology: TechnologyPersistance;
};

export class SalaryReportMapper {
  public static toEntity(raw: SalaryReportRawToEntity): SalaryReport | null {
    const salaryReportResult = SalaryReport.create(
      {
        position: PositionMapper.toEntity(raw.position),
        city: CityMapper.toEntity(raw.city),
        technology: TechnologyMapper.toEntity(raw.technology),
        annualSalary: AnnualSalary.create(raw.annualSalary).value,
        workExperience: WorkExperience.create(raw.workExperience).value,
        createdAt: CreatedAt.create(raw.createdAt),
      },
      UniqueId.create(raw._id)
    );

    if (salaryReportResult.checkStatus("success")) {
      return salaryReportResult.value;
    } else {
      return null;
    }
  }

  public static toPersistence(
    salaryReport: SalaryReport
  ): SalaryReportPersistance {
    return {
      _id: salaryReport.id.value,
      positionId: salaryReport.position.id.value,
      cityId: salaryReport.city.id.value,
      technologyId: salaryReport.technology.id.value,
      annualSalary: salaryReport.annualSalary.value,
      workExperience: salaryReport.workExperience.value,
      createdAt: salaryReport.createdAt.value,
    };
  }

  public static toDTO(salaryReport: SalaryReport): SalaryReportDTO {
    return {
      id: salaryReport.id.value,
      position: PositionMapper.toDTO(salaryReport.position),
      city: CityMapper.toDTO(salaryReport.city),
      technology: TechnologyMapper.toDTO(salaryReport.technology),
      annualSalary: salaryReport.annualSalary.value,
      workExperience: salaryReport.workExperience.value,
      createdAt: salaryReport.createdAt.value,
    };
  }
}
