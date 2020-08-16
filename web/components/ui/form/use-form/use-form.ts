import React from "react";

const hasErrors = (errors: object) => Object.values(errors).some(Boolean);

type ValueErrors<TValues> = { [name in keyof TValues]?: string };
type Touched<TValues> = { [name in keyof TValues]?: boolean };
type Event = { target: { name: string; value: string } };

type UseFormProps<TValues extends object> = {
  initialValues: TValues;
  onSubmit: (values: TValues) => void | never | Promise<void | never>;
  onValidate?: (values: TValues) => void | never | Promise<void | never>;
};

const useForm = <TValues extends object>({
  initialValues,
  onSubmit,
  onValidate,
}: UseFormProps<TValues>) => {
  const [values, setValues] = React.useState(initialValues);
  const [errors, setErrors] = React.useState<ValueErrors<TValues>>({});
  const [touched, setTouched] = React.useState<Touched<TValues>>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const validateValues = async (newValues: TValues) => {
    if (!onValidate) {
      return;
    }

    try {
      const validationResult = onValidate(newValues);

      if (validationResult instanceof Promise) {
        await validationResult;
      }

      setErrors({});
    } catch (errors) {
      setErrors(errors);
    }
  };

  const onFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsSubmitting(true);
    validateValues(values);

    try {
      const submissionResult = onSubmit(values);

      if (submissionResult instanceof Promise) {
        await submissionResult;
      }

      setErrors({});
    } catch (errors) {
      setErrors(errors);
    } finally {
      setIsSubmitting(false);
    }
  };

  const onFieldValueChange = (event: Event) => {
    const { name, value } = event.target;
    const newValues = { ...values, [name]: value };

    setValues(newValues);
    validateValues(newValues);
  };

  const onFieldBlur = (event: Event) => {
    const { name } = event.target;

    setTouched({ ...touched, [name]: true });
    validateValues(values);
  };

  const resetForm = () => {
    setErrors({});
    setTouched({});
    setValues(initialValues);
  };

  return {
    values,
    errors,
    touched,
    isSubmitting,
    resetForm,
    onFormSubmit,
    onFieldBlur,
    onFieldValueChange,
  };
};

export default useForm;