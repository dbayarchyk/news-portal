import React from "react";

import styles from "./visually-hidden.module.scss";

type VisuallyHiddenProps = Omit<JSX.IntrinsicElements["span"], "className">;

const VisuallyHidden: React.FC<VisuallyHiddenProps> = (props) => {
  return <span {...props} className={styles.visuallyHidden} />;
};

export default VisuallyHidden;
