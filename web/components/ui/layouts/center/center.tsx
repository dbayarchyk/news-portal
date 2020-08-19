import React from "react";

import styles from "./center.module.scss";

const GUTTERS_CLASSNAMES = {
  "1": styles.gutters1,
  "2": styles.gutters2,
  "3": styles.gutters3,
  "4": styles.gutters4,
  "5": styles.gutters5,
  "6": styles.gutters6,
  "7": styles.gutters7,
  "8": styles.gutters8,
};

type CenterProps = {
  gutters?: keyof typeof GUTTERS_CLASSNAMES;
  className?: string;
  max?: string;
  isIntrinsic?: boolean;
  isTextCentered?: boolean;
};

const Center: React.FC<CenterProps> = ({
  children,
  gutters,
  max,
  className,
  isIntrinsic,
  isTextCentered,
}) => {
  const classNames = [className, styles.center];

  if (isIntrinsic) {
    classNames.push(styles.intrinsic);
  }

  if (isTextCentered) {
    classNames.push(styles.centeredText);
  }

  if (gutters && GUTTERS_CLASSNAMES[gutters]) {
    classNames.push(GUTTERS_CLASSNAMES[gutters]);
  }

  return (
    <div
      className={classNames.join(" ")}
      style={{ "--max-width": max } as React.CSSProperties}
    >
      {children}
    </div>
  );
};

export default Center;
