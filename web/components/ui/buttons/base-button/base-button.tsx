import React from "react";

import styles from "./base-button.module.scss";

type BaseButtonProps = JSX.IntrinsicElements["button"];

const BaseButton = React.forwardRef<HTMLButtonElement, BaseButtonProps>(
  ({ title, className, ...buttonProps }, ref) => {
    return (
      <button
        ref={ref}
        {...buttonProps}
        className={[styles.baseButton, className].join(" ")}
      >
        {title}
      </button>
    );
  }
);

export default BaseButton;
