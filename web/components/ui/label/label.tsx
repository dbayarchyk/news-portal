import React from "react";

import BodyText from "../../body-text";

type LabelProps = {
  htmlFor?: string;
};

const Label: React.FC<LabelProps> = ({ htmlFor, children }) => {
  return (
    <label htmlFor={htmlFor}>
      <BodyText type="primary">{children}</BodyText>
    </label>
  );
};

export default Label;
