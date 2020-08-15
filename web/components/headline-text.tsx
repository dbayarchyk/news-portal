import React from "react";

import styles from "./headline-text.module.scss";

type HeadlineTextProps = {
  level: "1" | "2" | "3" | "4" | "5" | "6";
  className?: string;
} & JSX.IntrinsicElements["h1"];

const HeadlineText: React.FC<HeadlineTextProps> = ({
  level,
  className,
  ...restProps
}) => {
  const headlineElement = `h${level}`;

  return React.createElement(headlineElement, {
    className: [styles.headline, className].join(" "),
    ...restProps,
  });
};

export default HeadlineText;
