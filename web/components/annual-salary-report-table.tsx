import React from "react";

import Table, { TableCell } from "./ui/table";
// import Center from "./ui/layouts/center";
import { AnnualSalaryReportItem } from "../api/market";

type AnnualSalaryReportTableProps = {
  annualSalaryReport: AnnualSalaryReportItem[];
};

const AnnualSalaryReportTable: React.FC<AnnualSalaryReportTableProps> = ({
  annualSalaryReport,
}) => {
  return (
    <Table>
      <thead>
        <tr>
          <TableCell as="th" align="left">
            Name
          </TableCell>
          <TableCell as="th" align="right">
            Median
          </TableCell>
          <TableCell as="th" align="right">
            Min
          </TableCell>
          <TableCell as="th" align="right">
            Max
          </TableCell>
          <TableCell as="th" align="center"></TableCell>
          <TableCell as="th" align="right">
            📄
          </TableCell>
        </tr>
      </thead>

      <tbody>
        {annualSalaryReport.map((reportItem) => (
          <tr key={reportItem.groupBy}>
            <TableCell as="td" align="left">
              {reportItem.groupBy}
            </TableCell>
            <TableCell as="td" align="right">
              {reportItem.median}
            </TableCell>
            <TableCell as="td" align="right">
              {reportItem.min}
            </TableCell>
            <TableCell as="td" align="right">
              {reportItem.max}
            </TableCell>
            <TableCell as="td" align="center">
              {/* <SalaryRangeChartAxis
              lowerBound={salaryChartLowerBound}
              upperBound={salaryChartUpperBound}
              tickRange={salaryChartTickRange}
            /> */}
            </TableCell>
            <TableCell as="td" align="right">
              {reportItem.count}
            </TableCell>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default AnnualSalaryReportTable;
