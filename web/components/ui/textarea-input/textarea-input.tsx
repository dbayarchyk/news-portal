import React from "react";

import styles from "./textarea-input.module.scss";

type TextareaInputProps = JSX.IntrinsicElements["textarea"];

const TextareaInput = React.forwardRef<HTMLTextAreaElement, TextareaInputProps>(
  ({ className, ...restProps }, ref) => {
    return (
      <textarea
        {...restProps}
        ref={ref}
        className={`${styles.textarea} ${className}`}
      />
    );
  }
);

export default TextareaInput;
