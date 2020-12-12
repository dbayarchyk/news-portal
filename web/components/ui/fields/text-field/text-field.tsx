import React from "react";

import Field from "../field";
import Label from "../../label";
import TextInput from "../../text-input";
import FieldError from "../../field-error";

type TextInputProps = React.ComponentProps<typeof TextInput>;

type TextFieldProps = {
  label: string;

  id: string;
  name?: string;
  value: string;
  type?: TextInputProps["type"];
  autoComplete?: TextInputProps["autoComplete"];
  pattern?: TextInputProps["pattern"];
  inputMode?: TextInputProps["inputMode"];
  list?: TextInputProps["list"];
  autoFocus?: TextInputProps["autoFocus"];
  placeholder?: TextInputProps["placeholder"];
  onChange: TextInputProps["onChange"];
  onBlur?: TextInputProps["onBlur"];
  onFocus?: TextInputProps["onFocus"];

  errorMessage?: string;
};

const TextField: React.FC<TextFieldProps> = ({
  label,
  id,
  name,
  value,
  type,
  list,
  placeholder,
  pattern,
  inputMode,
  autoComplete,
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

      <TextInput
        id={id}
        value={value}
        name={name}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        autoFocus={autoFocus}
        list={list}
        pattern={pattern}
        inputMode={inputMode}
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

export default TextField;
