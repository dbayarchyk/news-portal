import React from "react";

import styles from "./range-chart-axis.module.scss";

const createLabels = (start: number, end: number, step: number): number[] => {
  if (!step) {
    return [];
  }

  const labels = [];

  for (let label = start; label <= end; label += step) {
    labels.push(label);
  }

  return labels;
};

type RangeChartAxisProps = {
  lowerBound: number;
  upperBound: number;
  tickRange: number;
};

const RangeChartAxis: React.FC<RangeChartAxisProps> = ({
  lowerBound,
  upperBound,
  tickRange,
}) => {
  const labels = createLabels(lowerBound, upperBound, tickRange);

  return (
    <div className={styles.axis}>
      {labels.map((label, labelIndex) => (
        <span
          key={label}
          className={styles.label}
          style={{ right: `${(1 - labelIndex / (labels.length - 1)) * 100}%` }}
        >
          {label}
        </span>
      ))}
    </div>
  );
};

export default RangeChartAxis;
