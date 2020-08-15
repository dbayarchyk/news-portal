import React from "react";

import BaseButton from "../base-button";
import styles from "./secondary-button.module.scss";

type SecondaryButtonProps = React.ComponentProps<typeof BaseButton>;

const SecondaryButton = React.forwardRef<
  HTMLButtonElement,
  SecondaryButtonProps
>(({ className, ...buttonProps }, ref) => {
  return (
    <BaseButton
      {...buttonProps}
      ref={ref}
      className={[styles.secondaryButton, className].join(" ")}
    />
  );
});

export default SecondaryButton;
