import React from "react";

import ErrorMessage from "../error-message";

type ErrorMessageProps = React.ComponentProps<typeof ErrorMessage>;
type FieldErrorProps = { id: string } & Omit<
  ErrorMessageProps,
  "role" | "aria-live"
>;

const FieldError: React.FC<FieldErrorProps> = (props) => {
  return <ErrorMessage {...props} aria-live="assertive" role="alert" />;
};

export default FieldError;
