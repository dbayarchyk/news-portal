import React from 'react';
import { useRouter } from "next/router";
import NextLink from "next/link";

import PrimaryButton from "../ui/buttons/primary-button";
import BodyText from "../ui/body-text";
import HeadlineText from "../ui/headline-text";
import TextField from "../ui/fields/text-field";
import useForm from "../ui/form/use-form";
import Stack from "../ui/layouts/stack";
import Center from "../ui/layouts/center";
import Link from "../ui/link";
import signIn from '../../api/auth/sign-in';
import getCurrentUser from '../../api/auth/get-current-user';
import fetchAPI from '../../api/fetch-api';
import { useAuth } from '../../context/auth';

const SignInForm: React.FC = () => {
  const formState = useForm<FormValues>({
    initialValues: {
      email: "",
      password: "",
    },
    onValidate: validateFormValues,
    onSubmit: async (values) => {
      await signIn(fetchAPI, values);
      auth.signIn(await getCurrentUser(fetchAPI));
      navigateToNextPage();
    },
  });
  const router = useRouter();
  const auth = useAuth();

  const hasValidReturnLink = (returnLink): returnLink is string => {
    return typeof returnLink === 'string' && returnLink.length > 0;
  }

  const navigateToNextPage = () => {
    const returnLink = router.query.returnLink;

    if (hasValidReturnLink(returnLink)) {
      router.push(returnLink);
    } else {
      router.push('/');
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

        <Stack scale="2">
          <PrimaryButton
            type="submit"
            title={
              formState.isSubmitting ? "Submitting..." : "Sign In"
            }
          />

          <Center isTextCentered>
            <BodyText type="secondary">
              Don't have an account?{" "}
              <NextLink
                href={`/sign-up${hasValidReturnLink(router.query.returnLink) ? `?returnLink=${router.query.returnLink}`: ""}`}
              >
                <Link>Sign up</Link>
              </NextLink>
            </BodyText>
          </Center>
        </Stack>
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
