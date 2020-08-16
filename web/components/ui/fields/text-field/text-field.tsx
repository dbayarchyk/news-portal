import React from "react";

import Field from "../field";
import Label from "../../label";
import TextInput from "../../text-input";
import FieldError from "../../field-error";

type TextInputProps = React.ComponentProps<typeof TextInput>;

type TextareaFieldProps = {
  label: string;

  id: string;
  name?: string;
  value: string;
  onChange: TextInputProps["onChange"];
  onBlur?: TextInputProps["onBlur"];
  onFocus?: TextInputProps["onFocus"];

  errorMessage?: string;
};

const TextareaField: React.FC<TextareaFieldProps> = ({
  label,
  id,
  name,
  value,
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

      <TextInput
        id={id}
        value={value}
        name={name}
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
