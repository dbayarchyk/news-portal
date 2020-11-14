import React from "react";

import styles from "./switcher.module.scss";

const CLUSTER_SPACE_CLASSNAMES = {
  "1": styles.switcher1,
  "2": styles.switcher2,
  "3": styles.switcher3,
  "4": styles.switcher4,
  "5": styles.switcher5,
  "6": styles.switcher6,
  "7": styles.switcher7,
  "8": styles.switcher8,
};

type SwitcherProps = {
  scale: keyof typeof CLUSTER_SPACE_CLASSNAMES;
  threshold: number;
  className?: string;
};

const Switcher: React.FC<SwitcherProps> = ({ children, scale, className, threshold }) => {
  return (
    <div
      className={[
        className,
        styles.switcher,
        CLUSTER_SPACE_CLASSNAMES[scale],
      ].join(" ")}
      style={{
        '--threshold': `${threshold}em`,
      } as React.CSSProperties}
    >
      {children}
    </div>
  );
};

export default Switcher;
