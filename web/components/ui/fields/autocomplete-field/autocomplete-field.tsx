import React from "react";

import Field from "../field";
import Label from "../../label";
import AutocompleteInput from "../../autocomplete-input";
import FieldError from "../../field-error";

type AutocompleteInputProps = React.ComponentProps<typeof AutocompleteInput>;

type AutocompleteFieldProps = {
  label: string;

  id: string;
  name?: string;
  value: string;
  suggestions: AutocompleteInputProps["suggestions"];
  autoFocus?: AutocompleteInputProps["autoFocus"];
  placeholder?: AutocompleteInputProps["placeholder"];
  onChange: AutocompleteInputProps["onChange"];
  onBlur?: AutocompleteInputProps["onBlur"];
  onFocus?: AutocompleteInputProps["onFocus"];

  errorMessage?: string;
};

const AutocompleteField: React.FC<AutocompleteFieldProps> = ({
  label,
  id,
  name,
  value,
  suggestions,
  placeholder,
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

      <AutocompleteInput
        id={id}
        value={value}
        name={name}
        placeholder={placeholder}
        autoFocus={autoFocus}
        suggestions={suggestions}
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

export default AutocompleteField;
