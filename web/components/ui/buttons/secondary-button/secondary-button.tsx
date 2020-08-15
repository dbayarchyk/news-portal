import React from "react";

import { BaseButton } from "../base-button";
import styles from "./secondary-button.module.scss";

type SecondaryButtonProps = React.ComponentProps<typeof BaseButton>;

const SecondaryButton: React.FC<SecondaryButtonProps> = ({
  className,
  ...buttonProps
}) => {
  return (
    <BaseButton
      {...buttonProps}
      className={[styles.secondaryButton, className].join(" ")}
    />
  );
};

export default SecondaryButton;
