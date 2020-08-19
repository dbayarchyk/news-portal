import React from "react";

import styles from "./cluster.module.scss";

const CLUSTER_SPACE_CLASSNAMES = {
  "1": styles.cluster1,
  "2": styles.cluster2,
  "3": styles.cluster3,
  "4": styles.cluster4,
  "5": styles.cluster5,
  "6": styles.cluster6,
  "7": styles.cluster7,
  "8": styles.cluster8,
};

type CenterProps = {
  scale: keyof typeof CLUSTER_SPACE_CLASSNAMES;
  className?: string;
};

const Center: React.FC<CenterProps> = ({ children, scale, className }) => {
  return (
    <div
      className={[
        className,
        styles.cluster,
        CLUSTER_SPACE_CLASSNAMES[scale],
      ].join(" ")}
    >
      {children}
    </div>
  );
};

export default Center;
