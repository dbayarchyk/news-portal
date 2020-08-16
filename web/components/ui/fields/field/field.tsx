import React from "react";

import style from "./field.module.scss";

const Field: React.FC = ({ children }) => {
  return <div className={style.field}>{children}</div>;
};

export default Field;
