import React from "react";

import styles from "./text-input.module.scss";

type TextInputProps = JSX.IntrinsicElements["input"];

const TextInput: React.FC<TextInputProps> = ({ className, ...restProps }) => {
  return <input {...restProps} className={`${styles.input} ${className}`} />;
};

export default TextInput;
