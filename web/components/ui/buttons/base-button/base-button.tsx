import React from "react";

import styles from "./base-button.module.scss";

type BaseButtonProps = JSX.IntrinsicElements["button"];

const BaseButton: React.FC<BaseButtonProps> = ({
  title,
  className,
  ...buttonProps
}) => {
  return (
    <button
      {...buttonProps}
      className={[styles.baseButton, className].join(" ")}
    >
      {title}
    </button>
  );
};

export default BaseButton;
