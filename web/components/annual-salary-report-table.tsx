import React from "react";

import { AnnualSalaryReportItem } from "../api/market";

type AnnualSalaryReportTableProps = {
  annualSalaryReport: AnnualSalaryReportItem[];
};

const AnnualSalaryReportTable: React.FC<AnnualSalaryReportTableProps> = ({
  annualSalaryReport,
}) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Median</th>
          <th>Min</th>
          <th>Max</th>
          <th></th>
          <th>📄</th>
        </tr>
      </thead>

      <tbody>
        {annualSalaryReport.map((reportItem) => (
          <tr key={reportItem.groupBy}>
            <th>{reportItem.groupBy}</th>
            <th>{reportItem.median}</th>
            <th>{reportItem.min}</th>
            <th>{reportItem.max}</th>
            <th>
              {/* <SalaryRangeChartAxis
              lowerBound={salaryChartLowerBound}
              upperBound={salaryChartUpperBound}
              tickRange={salaryChartTickRange}
            /> */}
            </th>
            <th>{reportItem.count}</th>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AnnualSalaryReportTable;
