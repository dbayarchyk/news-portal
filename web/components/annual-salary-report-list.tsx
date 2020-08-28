import React from "react";

import Stack from "./ui/layouts/stack";
import AnnualSalaryReportListItem from "./annual-salary-report-list-item";
import { AnnualSalaryReportItem } from "../api/market";
import styles from "./annual-salary-report-list.module.scss";

type AnnualSalaryReportListProps = {
  annualSalaryReport: AnnualSalaryReportItem[];
};

const AnnualSalaryReportList: React.FC<AnnualSalaryReportListProps> = ({
  annualSalaryReport,
}) => {
  const minAnnualSalary =
    Math.min(...annualSalaryReport.map((item) => item.min)) || 0;
  const maxAnnualSalary =
    Math.max(...annualSalaryReport.map((item) => item.max)) || 0;

  return (
    <Stack as="ul" scale="2" className={styles.list}>
      {annualSalaryReport.map((item) => (
        <AnnualSalaryReportListItem
          key={item.groupBy}
          annualSalaryReportItem={item}
          minAnnualSalary={minAnnualSalary}
          maxAnnualSalary={maxAnnualSalary}
        />
      ))}
    </Stack>
  );
};

export default AnnualSalaryReportList;
