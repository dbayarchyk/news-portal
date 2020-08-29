import React from "react";

import styles from "./blockquote.module.scss";

const Blockquote: React.FC = ({ children }) => {
  return <blockquote className={styles.blockquote}>{children}</blockquote>;
};

export default Blockquote;
