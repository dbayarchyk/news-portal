import React from "react";
import { useQuery } from "react-query";
import { useTabState, Tab, TabList, TabPanel } from "reakit/Tab";

import Stack from "./ui/layouts/stack";
import AnnualSalaryReportData from "./annual-salary-report-data";
import AnnualSalaryReportMissingData from "./annual-salary-report-missing-data";
import { AnnualSalaryReportItem, getAnnualSalaryReport } from "../api/market";

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
    () => getAnnualSalaryReport(tabState.selectedId as any),
    { initialData: initialAnnualSalaryReport }
  );

  React.useEffect(() => {
    refetch();
  }, [tabState.selectedId]);

  return (
    <Stack scale="6">
      <Stack scale="4">
        <TabList {...tabState} aria-label="Annual salary report">
          <Tab {...tabState} id="technology">
            Technology
          </Tab>
          <Tab {...tabState} id="position">
            Position
          </Tab>
          <Tab {...tabState} id="city">
            City
          </Tab>
        </TabList>

        <TabPanel {...tabState} id="technology">
          <AnnualSalaryReportData annualSalaryReport={data} />
        </TabPanel>
        <TabPanel {...tabState} id="position">
          <AnnualSalaryReportData annualSalaryReport={data} />
        </TabPanel>
        <TabPanel {...tabState} id="city">
          <AnnualSalaryReportData annualSalaryReport={data} />
        </TabPanel>
      </Stack>

      <AnnualSalaryReportMissingData />
    </Stack>
  );
};

export default AnnualSalaryReport;
