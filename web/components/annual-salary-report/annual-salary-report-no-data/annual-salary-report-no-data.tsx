import React from "react";
import Link from "next/link";

import BodyText from "../../ui/body-text";
import HeadlineText from "../../ui/headline-text";
import SecondaryButton from "../../ui/buttons/secondary-button";
import Stack from "../../ui/layouts/stack";
import Center from "../../ui/layouts/center";
import styles from "./annual-salary-report-no-data.module.scss";

const AnnualSalaryReportNoData: React.FC = () => {
  return (
    <Stack scale="3">
      <Stack scale="4">
        <Stack scale="2">
          <Center isIntrinsic>
            <img className={styles.illustration} src="no-data.svg" alt="" />
          </Center>

          <Center isIntrinsic>
            <HeadlineText level="2">Not enough data</HeadlineText>
          </Center>
        </Stack>

        <Center isIntrinsic>
          <BodyText>
            There is no enough data yet to make a balanced report.
          </BodyText>
        </Center>
      </Stack>

      <Center isIntrinsic>
        <Link href="./salaries/share">
          <a>
            <SecondaryButton tabIndex={-1} title="Help us to make the report" />
          </a>
        </Link>
      </Center>
    </Stack>
  );
};

export default AnnualSalaryReportNoData;
