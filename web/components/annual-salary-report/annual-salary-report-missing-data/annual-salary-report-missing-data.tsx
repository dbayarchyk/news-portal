import React from "react";
import Link from "next/link";

import BodyText from "../../ui/body-text";
import SecondaryButton from "../../ui/buttons/secondary-button";
import Stack from "../../ui/layouts/stack";
import Cluster from "../../ui/layouts/cluster";
import styles from "./annual-salary-report-missing-data.module.scss";

const AnnualSalaryReportMissingData: React.FC = () => {
  return (
    <Cluster scale="6" className={styles.card}>
      <div className={styles.cardContent}>
        <img className={styles.illustration} src="file-searching.svg" alt="" />

        <Stack scale="2">
          <BodyText type="primary">
            No report for you position, city or technology?
          </BodyText>

          <BodyText>
            We try to provide a balanced report for every person. If you don't
            see the report for your industry that means we have not collected
            enough data yet. With your anonymous help we can build the analysis
            together.
          </BodyText>

          <div>
            <Link href="./salaries/share">
              <a>
                <SecondaryButton tabIndex={-1} title="Share your report" />
              </a>
            </Link>
          </div>
        </Stack>
      </div>
    </Cluster>
  );
};

export default AnnualSalaryReportMissingData;
