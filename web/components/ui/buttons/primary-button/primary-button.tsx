import React from "react";

import { BaseButton } from "../base-button";
import styles from "./primary-button.module.scss";

type PrimaryButtonProps = React.ComponentProps<typeof BaseButton>;

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  className,
  ...buttonProps
}) => {
  return (
    <BaseButton
      {...buttonProps}
      className={[styles.primaryButton, className].join(" ")}
    />
  );
};

export default PrimaryButton;
