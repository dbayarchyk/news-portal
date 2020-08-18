import React from "react";

import Stack from "../../layouts/stack";
import style from "./field.module.scss";

const Field: React.FC = ({ children }) => {
  return (
    <Stack scale="1" className={style.field}>
      {children}
    </Stack>
  );
};

export default Field;
