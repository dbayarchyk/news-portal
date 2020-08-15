import React from "react";

import BodyText from "../body-text";
import styles from "./error-message.module.scss";

type BodyTextProps = React.ComponentProps<typeof BodyText>;
type ErrorMessageProps = Omit<BodyTextProps, "type">;

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  className,
  ...restProps
}) => {
  return (
    <BodyText
      {...restProps}
      type="primary"
      className={[styles.errorMessage, className].join(" ")}
    />
  );
};

export default ErrorMessage;
