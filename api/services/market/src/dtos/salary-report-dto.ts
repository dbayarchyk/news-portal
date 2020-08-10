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
