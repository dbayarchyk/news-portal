import React from "react";

import styles from "./select-input.module.scss";

type SelectInputProps = JSX.IntrinsicElements["select"];

const SelectInput: React.FC<SelectInputProps> = ({
  className,
  ...restProps
}) => {
  return <select {...restProps} className={`${styles.select} ${className}`} />;
};

export default SelectInput;
