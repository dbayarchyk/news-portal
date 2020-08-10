import React from "react";
import { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import "isomorphic-fetch";

import HeadTitle from "../../components/head-title";
import SalaryReportForm from "../../components/salary-report-form";
import {
  Position,
  City,
  Technology,
  getCities,
  getPositions,
  getTechnologies,
} from "../../api/market";

type ShareSalaryPageProps = {
  positions: Position[];
  cities: City[];
  technologies: Technology[];
};

export const getServerSideProps: GetServerSideProps<ShareSalaryPageProps> = async () => {
  const cityCollection = await getCities().catch(() => ({ items: [] }));
  const positionCollection = await getPositions().catch(() => ({ items: [] }));
  const technologyCollection = await getTechnologies().catch(() => ({
    items: [],
  }));

  return {
    props: {
      positions: positionCollection.items,
      cities: cityCollection.items,
      technologies: technologyCollection.items,
    },
  };
};

const ShareSalaryPage: NextPage<ShareSalaryPageProps> = ({
  positions,
  cities,
  technologies,
}) => {
  return (
    <>
      <Head>
        <HeadTitle title="Share Salary" />
      </Head>

      <div>
        <SalaryReportForm
          positions={positions}
          cities={cities}
          technologies={technologies}
        />
      </div>
    </>
  );
};

export default ShareSalaryPage;
