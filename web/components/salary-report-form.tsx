import React from "react";
import { useRouter } from "next/router";
import {
  unstable_useFormState as useFormState,
  unstable_Form as Form,
  unstable_FormLabel as FormLabel,
  unstable_FormInput as FormInput,
  unstable_FormMessage as FormMessage,
  unstable_FormSubmitButton as FormSubmitButton,
} from "reakit/Form";

import {
  createSalaryReport,
  CreateSalaryReportData,
  Position,
  City,
  Technology,
} from "../api/market";
import { TextInput } from "./ui/text-input";
import { SelectInput } from "./ui/select-input";
import { PrimaryButton } from "./ui/buttons/primary-button";
import Label from "./ui/label";
import FieldError from "./ui/field-error";
import HeadlineText from "./headline-text";
import BodyText from "./body-text";

type FormValues = {
  positionId: string;
  technologyId: string;
  cityId: string;
  annualSalary: string;
  workExperience: string;
};

const validateFormValues = (values: FormValues): void | never => {
  const errors = new Map<keyof FormValues, string>();

  if (!values.positionId) {
    errors.set("positionId", "Please provide your position");
  }

  if (!values.technologyId) {
    errors.set("technologyId", "Please provide your main technology");
  }

  if (!values.cityId) {
    errors.set("cityId", "Please provide your city");
  }

  if (!values.annualSalary) {
    errors.set("annualSalary", "Please provide your annual salary");
  } else if (Number.isNaN(Number(values.annualSalary)) === true) {
    errors.set("annualSalary", "Please provide a valid number");
  }

  if (!values.workExperience) {
    errors.set("workExperience", "Please provide your working experience");
  } else if (Number.isNaN(Number(values.workExperience)) === true) {
    errors.set("workExperience", "Please provide a valid number");
  }

  if (errors.size) {
    throw Object.fromEntries(errors.entries());
  }
};

const formValuesToCreateSalaryReportDate = (
  values: FormValues
): CreateSalaryReportData => ({
  positionId: values.positionId,
  cityId: values.cityId,
  technologyId: values.technologyId,
  annualSalary: Number(values.annualSalary),
  workExperience: Number(values.workExperience),
});

type SalaryReportFormProps = {
  positions: Position[];
  cities: City[];
  technologies: Technology[];
};

const SalaryReportForm: React.FC<SalaryReportFormProps> = ({
  positions,
  cities,
  technologies,
}) => {
  const router = useRouter();
  const formState = useFormState<FormValues>({
    values: {
      positionId: "",
      technologyId: "",
      cityId: "",
      annualSalary: "",
      workExperience: "",
    },
    onValidate: validateFormValues,
    onSubmit: async (values) => {
      const createSalaryReportData = formValuesToCreateSalaryReportDate(values);

      await createSalaryReport(createSalaryReportData);
      router.push("./salaries");
    },
  });

  return (
    <Form {...formState}>
      <HeadlineText level="1">Share your salary</HeadlineText>
      <BodyText>Let's make the German IT market transparent together</BodyText>

      <div>
        <FormLabel {...formState} as={Label} name="positionId">
          Position
        </FormLabel>
        <FormInput {...formState} as={SelectInput} name="positionId">
          <option value="" disabled>
            -- Please choose --
          </option>
          {positions.map((position) => (
            <option key={position.id} value={position.id}>
              {position.name}
            </option>
          ))}
        </FormInput>
        <FormMessage {...formState} as={FieldError as any} name="positionId" />
      </div>

      <div>
        <FormLabel {...formState} as={Label} name="technologyId">
          Technology
        </FormLabel>
        <FormInput {...formState} as={SelectInput} name="technologyId">
          <option value="" disabled>
            -- Please choose --
          </option>
          {technologies.map((technology) => (
            <option key={technology.id} value={technology.id}>
              {technology.name}
            </option>
          ))}
        </FormInput>
        <FormMessage
          {...formState}
          as={FieldError as any}
          name="technologyId"
        />
      </div>

      <div>
        <FormLabel {...formState} as={Label} name="cityId">
          City
        </FormLabel>
        <FormInput {...formState} as={SelectInput} name="cityId">
          <option value="" disabled>
            -- Please choose --
          </option>
          {cities.map((city) => (
            <option key={city.id} value={city.id}>
              {city.name}
            </option>
          ))}
        </FormInput>
        <FormMessage {...formState} as={FieldError as any} name="cityId" />
      </div>

      <div>
        <FormLabel {...formState} as={Label} name="annualSalary">
          Annual Salary
        </FormLabel>
        <FormInput
          {...formState}
          as={TextInput}
          name="annualSalary"
          inputMode="numeric"
          pattern="[0-9]*"
        />
        <FormMessage
          {...formState}
          as={FieldError as any}
          name="annualSalary"
        />
      </div>

      <div>
        <FormLabel {...formState} as={Label} name="workExperience">
          Work experience
        </FormLabel>
        <FormInput
          {...formState}
          as={TextInput}
          name="workExperience"
          inputMode="numeric"
          pattern="[0-9]*"
        />
        <FormMessage
          {...formState}
          as={FieldError as any}
          name="workExperience"
        />
      </div>

      <FormSubmitButton
        {...formState}
        as={PrimaryButton}
        title={formState.submitting ? "Submitting..." : "Share my salary"}
      />
      <BodyText type="secondary">This is completely anonymous</BodyText>
    </Form>
  );
};

export default SalaryReportForm;
