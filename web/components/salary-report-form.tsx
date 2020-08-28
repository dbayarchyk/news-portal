import React from "react";
import { useRouter } from "next/router";

import {
  createSalaryReport,
  CreateSalaryReportData,
  Position,
  City,
  Technology,
} from "../api/market";
import PrimaryButton from "./ui/buttons/primary-button";
import HeadlineText from "./ui/headline-text";
import BodyText from "./ui/body-text";
import SelectField from "./ui/fields/select-field";
import TextField from "./ui/fields/text-field";
import useForm from "./ui/form/use-form";
import Stack from "./ui/layouts/stack";

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
  const formState = useForm({
    initialValues: {
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
  const router = useRouter();

  return (
    <form onSubmit={formState.onFormSubmit}>
      <Stack scale="6">
        <Stack scale="1">
          <HeadlineText level="1">Share your salary</HeadlineText>
          <BodyText>
            Let's make the German IT market transparent together
          </BodyText>
        </Stack>

        <SelectField
          label="Position"
          name="positionId"
          id="positionId"
          value={formState.values.positionId}
          placeholder="Please pick the position"
          options={positions.map((position) => ({
            value: position.id,
            label: position.name,
          }))}
          errorMessage={formState.errors.positionId}
          onChange={formState.onFieldValueChange}
          onBlur={formState.onFieldBlur}
        />

        <SelectField
          label="Technology"
          name="technologyId"
          id="technologyId"
          value={formState.values.technologyId}
          placeholder="Please pick the technology"
          options={technologies.map((technology) => ({
            value: technology.id,
            label: technology.name,
          }))}
          errorMessage={formState.errors.technologyId}
          onChange={formState.onFieldValueChange}
          onBlur={formState.onFieldBlur}
        />

        <SelectField
          label="City"
          name="cityId"
          id="cityId"
          value={formState.values.cityId}
          placeholder="Please pick the city"
          options={cities.map((city) => ({
            value: city.id,
            label: city.name,
          }))}
          errorMessage={formState.errors.cityId}
          onChange={formState.onFieldValueChange}
          onBlur={formState.onFieldBlur}
        />

        <TextField
          label="Annual salary"
          name="annualSalary"
          id="annualSalary"
          value={formState.values.annualSalary}
          errorMessage={formState.errors.annualSalary}
          onChange={formState.onFieldValueChange}
          onBlur={formState.onFieldBlur}
        />

        <TextField
          label="Work experience"
          name="workExperience"
          id="workExperience"
          value={formState.values.workExperience}
          errorMessage={formState.errors.workExperience}
          onChange={formState.onFieldValueChange}
          onBlur={formState.onFieldBlur}
        />

        <Stack scale="1">
          <div>
            <PrimaryButton
              type="submit"
              title={
                formState.isSubmitting ? "Submitting..." : "Share my salary"
              }
            />
          </div>
          <BodyText type="secondary">This is completely anonymous</BodyText>
        </Stack>
      </Stack>
    </form>
  );
};

export default SalaryReportForm;
