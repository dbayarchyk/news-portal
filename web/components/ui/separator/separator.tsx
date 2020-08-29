import React from "react";

import styles from "./separator.module.scss";

type SeparatorProps = {
  orientation?: "horizontal" | "vertical";
};

const Separator: React.FC<SeparatorProps> = ({
  orientation = "horizontal",
}) => {
  return (
    <hr
      className={styles.separator}
      role="separator"
      aria-orientation={orientation}
    />
  );
};

export default Separator;
