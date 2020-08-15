import React from "react";

import styles from "./link.module.scss";

type LinkProps = JSX.IntrinsicElements["a"];

const Link: React.FC<LinkProps> = ({ className, ...restProps }) => {
  return <a {...restProps} className={[styles.link, className].join(" ")} />;
};

export default Link;
