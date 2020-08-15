import React from "react";

import BaseButton from "../base-button";
import styles from "./primary-button.module.scss";

type PrimaryButtonProps = React.ComponentProps<typeof BaseButton>;

const PrimaryButton = React.forwardRef<HTMLButtonElement, PrimaryButtonProps>(
  ({ className, ...buttonProps }, ref) => {
    return (
      <BaseButton
        {...buttonProps}
        ref={ref}
        className={[styles.primaryButton, className].join(" ")}
      />
    );
  }
);

export default PrimaryButton;
