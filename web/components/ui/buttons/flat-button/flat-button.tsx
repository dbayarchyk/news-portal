import React from "react";

import { BaseButton } from "../base-button";
import styles from "./flat-button.module.scss";

type FlatButtonProps = React.ComponentProps<typeof BaseButton>;

const FlatButton: React.FC<FlatButtonProps> = ({
  className,
  ...buttonProps
}) => {
  return (
    <BaseButton
      {...buttonProps}
      className={[styles.flatButton, className].join(" ")}
    />
  );
};

export default FlatButton;
