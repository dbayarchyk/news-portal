import React from "react";

import Field from "../field";
import Label from "../../label";
import TextareaInput from "../../textarea-input";
import FieldError from "../../field-error";

type TextareaInputProps = React.ComponentProps<typeof TextareaInput>;

type TextareaFieldProps = {
  label: string;

  id: string;
  name?: string;
  value: string;
  placeholder?: string;
  textareaRef?: React.Ref<HTMLTextAreaElement>;
  autoFocus?: TextareaInputProps["autoFocus"];
  onChange: TextareaInputProps["onChange"];
  onBlur?: TextareaInputProps["onBlur"];
  onFocus?: TextareaInputProps["onFocus"];

  errorMessage?: string;
};

const TextareaField: React.FC<TextareaFieldProps> = ({
  label,
  id,
  name,
  value,
  placeholder,
  textareaRef,
  autoFocus,
  onChange,
  onBlur,
  onFocus,
  errorMessage,
}) => {
  const errorId = `${id}-error`;
  const hasError = Boolean(errorMessage);

  return (
    <Field>
      <Label htmlFor={id}>{label}</Label>

      <TextareaInput
        ref={textareaRef}
        id={id}
        value={value}
        name={name}
        placeholder={placeholder}
        autoFocus={autoFocus}
        aria-invalid={hasError}
        aria-describedby={errorId}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
      />

      {hasError && <FieldError id={errorId}>{errorMessage}</FieldError>}
    </Field>
  );
};

export default TextareaField;
