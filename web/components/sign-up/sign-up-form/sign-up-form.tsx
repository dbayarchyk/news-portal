import React from 'react';
import { useRouter } from "next/router";
import NextLink from "next/link";

import PrimaryButton from "../../ui/buttons/primary-button";
import BodyText from "../../ui/body-text";
import HeadlineText from "../../ui/headline-text";
import TextField from "../../ui/fields/text-field";
import useForm from "../../ui/form/use-form";
import Stack from "../../ui/layouts/stack";
import Center from "../../ui/layouts/center";
import Link from "../../ui/link";
import signUp from '../../../api/auth/sign-up';
import fetchAPI from '../../../api/fetch-api';

const SignUpForm: React.FC = () => {
  const formState = useForm<FormValues>({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    onValidate: validateFormValues,
    onSubmit: async (values) => {
      await signUp(fetchAPI, values);
      navigateToNextPage();
    },
  });
  const router = useRouter();

  const hasValidReturnLink = (returnLink): returnLink is string => {
    return typeof returnLink === 'string' && returnLink.length > 0;
  }

  const navigateToNextPage = () => {
    router.push('/sign-up/confirmation');
  }

  return (
    <form onSubmit={formState.onFormSubmit}>
      <Stack scale="6">
        <HeadlineText level="1">
          Sign up to IT Dog
        </HeadlineText>

        <TextField
          label="Username"
          name="username"
          id="username"
          type="username"
          value={formState.values.username}
          errorMessage={formState.errors.username}
          onChange={formState.onFieldValueChange}
          onBlur={formState.onFieldBlur}
        />

        <TextField
          label="Email"
          name="email"
          id="email"
          type="email"
          value={formState.values.email}
          errorMessage={formState.errors.email}
          onChange={formState.onFieldValueChange}
          onBlur={formState.onFieldBlur}
        />

        <TextField
          label="Password"
          name="password"
          id="password"
          type="password"
          value={formState.values.password}
          errorMessage={formState.errors.password}
          onChange={formState.onFieldValueChange}
          onBlur={formState.onFieldBlur}
        />

        <Stack scale="2">
          <PrimaryButton
            type="submit"
            title={
              formState.isSubmitting ? "Submitting..." : "Sign Up"
            }
          />

          <Center isTextCentered>
            <BodyText type="secondary">
              Already have an account?{" "}
              <NextLink
                href={`/sign-in${hasValidReturnLink(router.query.returnLink) ? `?returnLink=${router.query.returnLink}`: ""}`}
              >
                <Link>Sign in</Link>
              </NextLink>
            </BodyText>
          </Center>
        </Stack>
      </Stack>
    </form>
  )
};

type FormValues = {
  username: string;
  email: string;
  password: string;
};

const validateFormValues = (values: FormValues): void | never => {
  const errors = new Map<keyof FormValues, string>();

  if (!values.username) {
    errors.set("username", "Please provide your username");
  }

  if (!values.email) {
    errors.set("email", "Please provide your email");
  }

  if (!values.password) {
    errors.set("password", "Please provide your password");
  }

  if (errors.size) {
    throw Object.fromEntries(errors.entries());
  }
};

export default SignUpForm;
