import React from "react";

const TICK_RANGE_MULTIPLIER = 1000;

type ChildrenOptions = {
  lowerBound: number;
  upperBound: number;
  tickRange: number;
};

type RangeChartProps = {
  globalMin: number;
  globalMax: number;
  ticksCount: number;
  children: (options: ChildrenOptions) => React.ReactNode;
};

const RangeChart: React.FC<RangeChartProps> = ({
  globalMin = 0,
  globalMax = 0,
  ticksCount = 4,
  children,
}) => {
  const range = globalMax - globalMin;
  const tickRange =
    Math.ceil(range / ticksCount / TICK_RANGE_MULTIPLIER) *
    TICK_RANGE_MULTIPLIER;
  const lowerBound = tickRange * Math.floor(globalMin / tickRange);
  const upperBound = tickRange * Math.ceil(globalMax / tickRange);

  return <>{children({ tickRange, lowerBound, upperBound })}</>;
};

export default RangeChart;
