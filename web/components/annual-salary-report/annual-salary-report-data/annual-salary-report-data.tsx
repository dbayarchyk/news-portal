import React from "react";

import AnnualSalaryReportTable from "../annual-salary-report-table";
import AnnualSalaryReportList from "../annual-salary-report-list";
import { AnnualSalaryReportItem } from "../../../api/market";
import styles from "./annual-salary-report-data.module.scss";

type AnnualSalaryReportDataProps = {
  annualSalaryReport: AnnualSalaryReportItem[];
};

const AnnualSalaryReportData: React.FC<AnnualSalaryReportDataProps> = ({
  annualSalaryReport,
}) => {
  return (
    <div>
      <div className={styles.tableContainer}>
        <AnnualSalaryReportTable annualSalaryReport={annualSalaryReport} />
      </div>

      <div className={styles.listContainer}>
        <AnnualSalaryReportList annualSalaryReport={annualSalaryReport} />
      </div>
    </div>
  );
};

export default AnnualSalaryReportData;
