import React from "react";

import styles from "./stack.module.scss";

const SCALE_CLASSNAMES = {
  "1": styles.stack1,
  "2": styles.stack2,
  "3": styles.stack3,
  "4": styles.stack4,
  "5": styles.stack5,
  "6": styles.stack6,
  "7": styles.stack7,
  "8": styles.stack8,
};

type StackProps = {
  className?: string;
  scale: keyof typeof SCALE_CLASSNAMES;
  as?: "ul" | "ol" | "div" | "section";
  "aria-describedby"?: string;
  "aria-labelledby"?: string;
  "data-testid"?: string;
};

const Stack: React.FC<StackProps> = ({
  className,
  scale,
  children,
  as = "div",
  "aria-describedby": ariaDescribedby,
  "aria-labelledby": ariaLabelledby,
  "data-testid": dataTestId,
}) => {
  const element = React.createElement(as, {
    children,
    className: [className, SCALE_CLASSNAMES[scale], styles.stack].join(" "),
    "aria-describedby": ariaDescribedby,
    "aria-labelledby": ariaLabelledby,
    "data-testid": dataTestId,
  });

  return element;
};

export default Stack;
