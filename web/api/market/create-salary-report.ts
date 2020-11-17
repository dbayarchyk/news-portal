import type { City } from './get-cities';
import type { Technology } from './get-technologies';

export type SalaryReport = {
  id: string;
  city: City;
  position: Position;
  technology: Technology;
  annualSalary: number;
  workExperience: number;
  createdAt: string;
};
  
export type CreateSalaryReportData = {
  positionId: string;
  cityId: string;
  technologyId: string;
  workExperience: number;
  annualSalary: number;
};
  
const createSalaryReport = async (
  fetch: typeof window.fetch,
  data: CreateSalaryReportData
): Promise<SalaryReport | never> => {
  const response = await fetch("/market/salary-reports/", {
    method: "POST",
    credentials: "omit",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  switch (response.status) {
    case 201: {
      return response.json();
    }

    case 422: {
      throw await response.json();
    }

    default: {
      throw new Error(`Unsupported response status: ${response.status}`);
    }
  }
};

export default createSalaryReport;
