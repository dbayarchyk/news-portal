import React from "react";
import { useQuery } from "react-query";
import { useTabState, Tab, TabList, TabPanel } from "reakit/Tab";

import AnnualSalaryReportTable from "./annual-salary-report-table";
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
    <section>
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
        <AnnualSalaryReportTable annualSalaryReport={data} />
      </TabPanel>
      <TabPanel {...tabState} id="position">
        <AnnualSalaryReportTable annualSalaryReport={data} />
      </TabPanel>
      <TabPanel {...tabState} id="city">
        <AnnualSalaryReportTable annualSalaryReport={data} />
      </TabPanel>
    </section>
  );
};

export default AnnualSalaryReport;
