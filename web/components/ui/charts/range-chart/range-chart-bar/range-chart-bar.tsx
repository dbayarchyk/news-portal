import React from "react";

import styles from "./range-chart-bar.module.scss";

type RangeChartBarProps = {
  lowerBound: number;
  upperBound: number;
  min: number;
  max: number;
  average: number;
};

const RangeChartBar: React.FC<RangeChartBarProps> = ({
  lowerBound,
  upperBound,
  min,
  max,
  average,
}) => {
  const boundRange = upperBound - lowerBound;
  const range = max - min;
  const rangeElWidth = `${(range / boundRange) * 100}%`;
  const rangeElLeftShift = `${((min - lowerBound) / boundRange) * 100}%`;
  const salaryLabelElLeftShift = `${((average - min) / range) * 100}%`;

  return (
    <div className={styles.chart}>
      <div
        className={styles.rangeBar}
        style={{
          width: rangeElWidth,
          left: rangeElLeftShift,
        }}
      >
        <span
          className={styles.label}
          style={{
            left: salaryLabelElLeftShift,
          }}
        >
          <span className={styles.labelText}>{average}</span>
        </span>
      </div>
    </div>
  );
};

export default RangeChartBar;
