import React from "react";
import { NextPage, GetServerSideProps } from "next";
import Link from "next/link";
import Head from "next/head";
import "isomorphic-fetch";

import {
  AnnualSalaryReportItem,
  getAnnualSalaryReport,
} from "../../api/market";
import AnnualSalaryReport from "../../components/annual-salary-report";
import { getHeadTitle } from "../../utils/head-title";

type SalariesPageProps = {
  annualSalaryReport: AnnualSalaryReportItem[];
  annualSalaryReportGroupBy: string;
};

export const getServerSideProps: GetServerSideProps<SalariesPageProps> = async () => {
  const annualSalaryReportGroupBy = "technology";
  const annualSalaryReport = await getAnnualSalaryReport(
    annualSalaryReportGroupBy
  );

  return {
    props: {
      annualSalaryReport,
      annualSalaryReportGroupBy,
    },
  };
};

const SalariesPage: NextPage<SalariesPageProps> = ({
  annualSalaryReport,
  annualSalaryReportGroupBy,
}) => {
  return (
    <>
      <Head>
        <title>{getHeadTitle("Salaries")}</title>
      </Head>

      <div>
        <div>
          <h1>Salaries</h1>
          <div>
            <p>Help us to make the German IT market transparent.</p>

            <Link href="./salaries/share">
              <a>Share your salary</a>
            </Link>
          </div>
        </div>

        <AnnualSalaryReport
          initialAnnualSalaryReport={annualSalaryReport}
          initialGroupBy={annualSalaryReportGroupBy}
        />
      </div>
    </>
  );
};

export default SalariesPage;
