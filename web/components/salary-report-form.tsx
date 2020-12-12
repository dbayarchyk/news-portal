import React from "react";
import { useRouter } from "next/router";

import createSalaryReport, { CreateSalaryReportData } from "../api/market/create-salary-report";
import type { Position } from "../api/market/get-positions";
import type { City } from "../api/market/get-cities";
import type { Technology } from "../api/market/get-technologies";
import fetchAPI from "../api/fetch-api";
import PrimaryButton from "./ui/buttons/primary-button";
import HeadlineText from "./ui/headline-text";
import BodyText from "./ui/body-text";
import TextField from "./ui/fields/text-field";
import useForm from "./ui/form/use-form";
import Stack from "./ui/layouts/stack";

type FormValues = {
  position: string;
  technology: string;
  city: string;
  annualSalary: string;
  workExperience: string;
};

const validateFormValues = (values: FormValues): void | never => {
  const errors = new Map<keyof FormValues, string>();

  if (!values.position) {
    errors.set("position", "Please provide your position");
  }

  if (!values.technology) {
    errors.set("technology", "Please provide your main technology");
  }

  if (!values.city) {
    errors.set("city", "Please provide your city");
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
  position: values.position,
  city: values.city,
  technology: values.technology,
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
      position: "",
      technology: "",
      city: "",
      annualSalary: "",
      workExperience: "",
    },
    onValidate: validateFormValues,
    onSubmit: async (values) => {
      const createSalaryReportData = formValuesToCreateSalaryReportDate(values);

      await createSalaryReport(fetchAPI, createSalaryReportData);
      router.push("/salaries");
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

        <TextField
          label="Position"
          name="position"
          id="position"
          value={formState.values.position}
          placeholder="Please pick the position"
          autoComplete="organization-title"
          list="positions"
          autoFocus
          errorMessage={formState.errors.position}
          onChange={formState.onFieldValueChange}
          onBlur={formState.onFieldBlur}
        />
        <datalist id="positions">
          {positions.map((position) => (
            <option key={position.id} value={position.name} />
          ))}
        </datalist>

        <TextField
          label="Technology"
          name="technology"
          id="technology"
          value={formState.values.technology}
          placeholder="Please pick the technology"
          list="technologies"
          errorMessage={formState.errors.technology}
          onChange={formState.onFieldValueChange}
          onBlur={formState.onFieldBlur}
        />
        <datalist id="technologies">
          {technologies.map((technology) => (
            <option key={technology.id} value={technology.name} />
          ))}
        </datalist>

        <TextField
          label="City"
          name="city"
          id="city"
          value={formState.values.city}
          autoComplete="locality"
          list="cities"
          placeholder="Please pick the city"
          errorMessage={formState.errors.city}
          onChange={formState.onFieldValueChange}
          onBlur={formState.onFieldBlur}
        />
        <datalist id="cities">
          {cities.map((city) => (
            <option key={city.id} value={city.name} />
          ))}
        </datalist>

        <TextField
          label="Annual salary"
          name="annualSalary"
          id="annualSalary"
          pattern="[0-9]*"
          inputMode="numeric"
          value={formState.values.annualSalary}
          errorMessage={formState.errors.annualSalary}
          onChange={formState.onFieldValueChange}
          onBlur={formState.onFieldBlur}
        />

        <TextField
          type="number"
          label="Work experience (years)"
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
