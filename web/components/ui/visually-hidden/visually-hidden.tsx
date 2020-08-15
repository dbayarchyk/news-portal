import React from "react";

import styles from "./visually-hidden.module.scss";

const VisuallyHidden: React.FC = ({ children }) => {
  return <span className={styles.visuallyHidden}>{children}</span>;
};

export default VisuallyHidden;
