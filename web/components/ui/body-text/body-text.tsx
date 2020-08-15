import React from "react";

import styles from "./body-text.module.scss";

type BodyTextProps = {
  type?: "normal" | "primary" | "secondary";
} & JSX.IntrinsicElements["p"];

const BodyText: React.FC<BodyTextProps> = ({
  type = "normal",
  className,
  ...restProps
}) => {
  return (
    <p
      className={[styles.text, styles[type], className].join(" ")}
      {...restProps}
    />
  );
};

export default BodyText;
