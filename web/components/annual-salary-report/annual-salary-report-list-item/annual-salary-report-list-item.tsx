import React from "react";

import VisuallyHidden from "../../ui/visually-hidden";
import Stack from "../../ui/layouts/stack";
import Cluster from "../../ui/layouts/cluster";
import HeadlineText from "../../ui/headline-text";
import BodyText from "../../ui/body-text";
import RangeChart, {
  RangeChartAxis,
  RangeChartBar,
} from "../../ui/charts/range-chart";
import { AnnualSalaryReportItem } from "../../../api/market";
import styles from "./annual-salary-report-list-item.module.scss";

type AnnualSalaryReportListItemProps = {
  minAnnualSalary: number;
  maxAnnualSalary: number;
  annualSalaryReportItem: AnnualSalaryReportItem;
};

const AnnualSalaryReportListItem: React.FC<AnnualSalaryReportListItemProps> = ({
  minAnnualSalary,
  maxAnnualSalary,
  annualSalaryReportItem,
}) => {
  const currencyFormatter = Intl.NumberFormat(
    'de-DE',
    {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    },
  );

  return (
    <li data-testid="salary-report-item">
      <article className={styles.card}>
        <Stack scale="4">
          <Cluster scale="2">
            <div>
              <div>
                <HeadlineText level="4">
                  <VisuallyHidden>Name:</VisuallyHidden>
                  {annualSalaryReportItem.groupBy}
                </HeadlineText>
              </div>

              <div>
                <BodyText type="secondary">
                  <span aria-label="items">📄</span>{" "}
                  {annualSalaryReportItem.count}
                </BodyText>
              </div>
            </div>
          </Cluster>

          <Cluster scale="6">
            <div>
              <Stack scale="1">
                <BodyText type="secondary">Median</BodyText>
                <BodyText>{currencyFormatter.format(annualSalaryReportItem.median)}</BodyText>
              </Stack>

              <Stack scale="1">
                <BodyText type="secondary">Min</BodyText>
                <BodyText>{currencyFormatter.format(annualSalaryReportItem.min)}</BodyText>
              </Stack>

              <Stack scale="1">
                <BodyText type="secondary">Max</BodyText>
                <BodyText>{currencyFormatter.format(annualSalaryReportItem.max)}</BodyText>
              </Stack>
            </div>
          </Cluster>

          <RangeChart
            globalMin={minAnnualSalary}
            globalMax={maxAnnualSalary}
            ticksCount={2}
          >
            {(options) => (
              <Stack scale="1">
                <RangeChartBar
                  {...options}
                  min={annualSalaryReportItem.min}
                  max={annualSalaryReportItem.max}
                  average={annualSalaryReportItem.median}
                />
                <RangeChartAxis {...options} />
              </Stack>
            )}
          </RangeChart>
        </Stack>
      </article>
    </li>
  );
};

export default AnnualSalaryReportListItem;
