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

const getAnnualSalaryReport = async (
  fetch: typeof window.fetch,
  groupBy: "city" | "position" | "technology"
): Promise<AnnualSalaryReportItem[] | never> => {
  const response = await fetch(
    `/market/salary-reports/analysis/annual/${groupBy}/`
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
  
export default getAnnualSalaryReport;
