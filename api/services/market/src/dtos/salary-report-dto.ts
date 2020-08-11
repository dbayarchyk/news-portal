import { CityDTO } from "./city-dto";
import { TechnologyDTO } from "./technology-dto";
import { PositionDTO } from "./position-dto";

export interface SalaryReportDTO {
  id: string;
  position: PositionDTO;
  city: CityDTO;
  technology: TechnologyDTO;
  annualSalary: number;
  workExperience: number;
  createdAt: string;
}

export interface AnnualSalaryReport {
  count: number;
  min: number;
  max: number;
  average: number;
  lowerQuartile: number;
  median: number;
  upperQuartile: number;
  groupBy: string;
}
