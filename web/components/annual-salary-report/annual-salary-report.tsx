import React from "react";
import { useQuery } from "react-query";
import { useTabState, Tab, TabList, TabPanel } from "reakit/Tab";

import Stack from "../ui/layouts/stack";
import AnnualSalaryReportData from "./annual-salary-report-data";
import AnnualSalaryReportMissingData from "./annual-salary-report-missing-data";
import AnnualSalaryReportNoData from "./annual-salary-report-no-data";
import getAnnualSalaryReport, { AnnualSalaryReportItem } from "../../api/market/get-annual-salary-report";
import fetchAPI from "../../api/fetch-api";
import styles from "./annual-salary-report.module.scss";

type AnnualSalaryReportProps = {
  initialAnnualSalaryReport: AnnualSalaryReportItem[];
  initialGroupBy: string;
};

const AnnualSalaryReport: React.FC<AnnualSalaryReportProps> = ({
  initialAnnualSalaryReport,
  initialGroupBy,
}) => {
  const tabState = useTabState({ selectedId: initialGroupBy });
  const {
    data,
    refetch,
  } = useQuery(
    `annual-salary-report-${tabState.selectedId}`,
    () =>
      getAnnualSalaryReport(
        fetchAPI,
        tabState.selectedId as Parameters<typeof getAnnualSalaryReport>[1]
      ),
    { initialData: initialAnnualSalaryReport }
  );

  React.useEffect(() => {
    refetch();
  }, [tabState.selectedId]);

  const hasReportItems = data.length > 0;
  const tabPanelContent = hasReportItems ? (
    <AnnualSalaryReportData annualSalaryReport={data} />
  ) : (
    <AnnualSalaryReportNoData />
  );

  return (
    <Stack scale="6">
      <Stack scale="4">
        <TabList {...tabState} aria-label="Annual salary report">
          <Tab {...tabState} className={styles.tab} id="technology">
            Technology
          </Tab>
          <Tab {...tabState} className={styles.tab} id="position">
            Position
          </Tab>
          <Tab {...tabState} className={styles.tab} id="city">
            City
          </Tab>
        </TabList>

        <TabPanel {...tabState} id="technology">
          {tabPanelContent}
        </TabPanel>
        <TabPanel {...tabState} id="position">
          {tabPanelContent}
        </TabPanel>
        <TabPanel {...tabState} id="city">
          {tabPanelContent}
        </TabPanel>
      </Stack>

      {hasReportItems ? (
        <AnnualSalaryReportMissingData />
      ): null}
    </Stack>
  );
};

export default AnnualSalaryReport;
