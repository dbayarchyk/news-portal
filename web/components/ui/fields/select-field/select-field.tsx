import React from "react";

import Field from "../field";
import Label from "../../label";
import SelectInput from "../../select-input";
import FieldError from "../../field-error";

type SelectInputProps = React.ComponentProps<typeof SelectInput>;

type SelectFieldProps = {
  label: string;

  id: string;
  name?: string;
  value: string;
  placeholder?: string;
  options: Array<{ value: string; label: string }>;
  autoComplete?: SelectInputProps["autoComplete"];
  autoFocus?: SelectInputProps["autoFocus"];
  onChange: SelectInputProps["onChange"];
  onBlur?: SelectInputProps["onBlur"];
  onFocus?: SelectInputProps["onFocus"];

  errorMessage?: string;
};

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  id,
  name,
  value,
  placeholder,
  autoComplete,
  autoFocus,
  options,
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

      <SelectInput
        id={id}
        value={value}
        name={name}
        autoComplete={autoComplete}
        autoFocus={autoFocus}
        aria-invalid={hasError}
        aria-describedby={errorId}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
      >
        {placeholder && (
          <option value="" disabled selected>
            --- {placeholder} ---
          </option>
        )}

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </SelectInput>

      {hasError && <FieldError id={errorId}>{errorMessage}</FieldError>}
    </Field>
  );
};

export default SelectField;
