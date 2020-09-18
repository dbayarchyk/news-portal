import "isomorphic-fetch";

const MARKET_SERVICE_API = `${process.env.NEXT_PUBLIC_API_URL}/market`;

export type City = {
  id: string;
  name: string;
};

type CityCollection = {
  items: City[];
};

export const getCities = async (): Promise<CityCollection> => {
  const response = await fetch(`${MARKET_SERVICE_API}/cities/`);

  switch (response.status) {
    case 200: {
      return response.json();
    }

    default: {
      throw new Error(`Unsupported response status: ${response.status}`);
    }
  }
};

export type Technology = {
  id: string;
  name: string;
};

type TechnologyCollection = {
  items: Technology[];
};

export const getTechnologies = async (): Promise<TechnologyCollection> => {
  const response = await fetch(`${MARKET_SERVICE_API}/technologies/`);

  switch (response.status) {
    case 200: {
      return response.json();
    }

    default: {
      throw new Error(`Unsupported response status: ${response.status}`);
    }
  }
};

export type Position = {
  id: string;
  name: string;
};

type PositionCollection = {
  items: Position[];
};

export const getPositions = async (): Promise<PositionCollection> => {
  const response = await fetch(`${MARKET_SERVICE_API}/positions/`);

  switch (response.status) {
    case 200: {
      return response.json();
    }

    default: {
      throw new Error(`Unsupported response status: ${response.status}`);
    }
  }
};

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

export const createSalaryReport = async (
  data: CreateSalaryReportData
): Promise<SalaryReport | never> => {
  const response = await fetch(`${MARKET_SERVICE_API}/salary-reports/`, {
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

export type AnnualSalaryReportItem = {
  count: number;
  min: number;
  max: number;
  average: number;
  lowerQuartile: number;
  median: number;
  upperQuartile: number;
  groupBy: string;
};

export const getAnnualSalaryReport = async (
  groupBy: "city" | "position" | "technology"
): Promise<AnnualSalaryReportItem[] | never> => {
  const response = await fetch(
    `${MARKET_SERVICE_API}/salary-reports/analysis/annual/${groupBy}/`
  );

  switch (response.status) {
    case 200: {
      return response.json();
    }

    default: {
      throw new Error(`Unsupported response status: ${response.status}`);
    }
  }
};
