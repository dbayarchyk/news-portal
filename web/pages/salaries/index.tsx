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
import HeadlineText from "../../components/ui/headline-text";
import BodyText from "../../components/ui/body-text";
import Stack from "../../components/ui/layouts/stack";
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

      <Stack scale="6">
        <Stack scale="2">
          <HeadlineText level="1">Salaries</HeadlineText>
          <Stack scale="1">
            <BodyText>
              Help us to make the German IT market transparent.
            </BodyText>

            <Link href="./salaries/share">
              <a>Share your salary</a>
            </Link>
          </Stack>
        </Stack>

        <AnnualSalaryReport
          initialAnnualSalaryReport={annualSalaryReport}
          initialGroupBy={annualSalaryReportGroupBy}
        />
      </Stack>
    </>
  );
};

export default SalariesPage;
