import React from "react";

import { BaseButton } from "../base-button";
import styles from "./flat-button.module.scss";

type FlatButtonProps = React.ComponentProps<typeof BaseButton>;

const FlatButton = React.forwardRef<HTMLButtonElement, FlatButtonProps>(
  ({ className, ...buttonProps }, ref) => {
    return (
      <BaseButton
        {...buttonProps}
        ref={ref}
        className={[styles.flatButton, className].join(" ")}
      />
    );
  }
);

export default FlatButton;
