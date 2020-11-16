import React from 'react';
import { useRouter } from "next/router";

import PrimaryButton from "../ui/buttons/primary-button";
import HeadlineText from "../ui/headline-text";
import TextField from "../ui/fields/text-field";
import useForm from "../ui/form/use-form";
import Stack from "../ui/layouts/stack";
import signIn from '../../api/auth/sign-in';
import getCurrentUser from '../../api/auth/get-current-user';
import getAPIFetch from '../../api/get-api-fetch';
import { useAuth } from '../../context/auth';

const SignInForm: React.FC = () => {
  const formState = useForm<FormValues>({
    initialValues: {
      email: "",
      password: "",
    },
    onValidate: validateFormValues,
    onSubmit: async (values) => {
      await signIn(values);
      const fetch = getAPIFetch();
      auth.signIn(await getCurrentUser(fetch));
      navigateToNextPage();
    },
  });
  const router = useRouter();
  const auth = useAuth();

  const navigateToNextPage = () => {
    const returnLink = router.query.returnLink;

    if (typeof returnLink === 'string' && returnLink.length > 0) {
      router.push(returnLink);
    } else {
      router.push('./');
    }
  }

  return (
    <form onSubmit={formState.onFormSubmit}>
      <Stack scale="6">
        <HeadlineText level="1">Welcome to IT Dog</HeadlineText>

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

        <PrimaryButton
          type="submit"
          title={
            formState.isSubmitting ? "Submitting..." : "Sign In"
          }
        />
      </Stack>
    </form>
  )
};

type FormValues = {
  email: string;
  password: string;
};

const validateFormValues = (values: FormValues): void | never => {
  const errors = new Map<keyof FormValues, string>();

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

export default SignInForm;
