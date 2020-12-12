import React from "react";

import Table, { TableCell } from "../../ui/table";
import RangeChart, {
  RangeChartAxis,
  RangeChartBar,
} from "../../ui/charts/range-chart";
import { AnnualSalaryReportItem } from "../../../api/market";
import styles from "./annual-salary-report-table.module.scss";

type AnnualSalaryReportTableProps = {
  annualSalaryReport: AnnualSalaryReportItem[];
};

const AnnualSalaryReportTable: React.FC<AnnualSalaryReportTableProps> = ({
  annualSalaryReport,
}) => {
  const minAnnualSalary =
    Math.min(...annualSalaryReport.map((item) => item.min)) || 0;
  const maxAnnualSalary =
    Math.max(...annualSalaryReport.map((item) => item.max)) || 0;

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
          <TableCell as="th" className={styles.rangeChartColumn} align="center">
            <RangeChart
              globalMin={minAnnualSalary}
              globalMax={maxAnnualSalary}
              ticksCount={4}
            >
              {(options) => <RangeChartAxis {...options} />}
            </RangeChart>
          </TableCell>
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
              <RangeChart
                globalMin={minAnnualSalary}
                globalMax={maxAnnualSalary}
                ticksCount={4}
              >
                {(options) => (
                  <RangeChartBar
                    {...options}
                    min={reportItem.min}
                    max={reportItem.max}
                    average={reportItem.median}
                  />
                )}
              </RangeChart>
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
