import React from "react";

import styles from "./body-text.module.scss";

type BodyTextProps = {
  type?: "normal" | "primary" | "secondary";
};

const BodyText: React.FC<BodyTextProps> = ({ type = "normal", children }) => {
  return <p className={`${styles.text} ${styles[type]}`}>{children}</p>;
};

export default BodyText;
