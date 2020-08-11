import { AggregateRoot } from "./aggregate-root";
import { UniqueId } from "../value-objects/unique-id";
import { CreatedAt } from "../value-objects/created-at";
import { AnnualSalary } from "../value-objects/annual-salary";
import { WorkExperience } from "../value-objects/work-experience";
import { Position } from "./position";
import { City } from "./city";
import { Technology } from "./technology";
import { Result } from "../utils/result";

interface SalaryReportProps {
  position: Position;
  city: City;
  technology: Technology;
  annualSalary: AnnualSalary;
  workExperience: WorkExperience;
  createdAt: CreatedAt;
}

export class SalaryReport extends AggregateRoot<SalaryReportProps> {
  public get id(): UniqueId {
    return this._id;
  }

  public get position(): Position {
    return this.props.position;
  }

  public get city(): City {
    return this.props.city;
  }

  public get technology(): Technology {
    return this.props.technology;
  }

  public get annualSalary(): AnnualSalary {
    return this.props.annualSalary;
  }

  public get workExperience(): WorkExperience {
    return this.props.workExperience;
  }

  public get createdAt(): CreatedAt {
    return this.props.createdAt;
  }

  private constructor(props: SalaryReportProps, id?: UniqueId | null) {
    super(props, id);
  }

  public static create(
    props: SalaryReportProps,
    id?: UniqueId | null
  ): Result<SalaryReport, never> {
    const salaryReport = new SalaryReport(props, id);

    return Result.ok(salaryReport);
  }
}
