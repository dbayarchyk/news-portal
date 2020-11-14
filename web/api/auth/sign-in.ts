import "isomorphic-fetch";

import AUTH_SERVICE_API from './api';

export type SingInData = {
  email: string;
  password: string;
};

const signIn = async (
  data: SingInData
): Promise<void | never> => {
  const response = await fetch(`${AUTH_SERVICE_API}/sign-in/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  switch (response.status) {
    case 200: {
      return;
    }

    case 400: {
      throw map400Response(await response.json());
    }

    default: {
      throw new Error(`Unsupported response status: ${response.status}`);
    }
  }
};

const map400Response = (response): Record<string, string> =>
  response.errors.reduce((errors, error) => ({
    ...errors,
    [error.field]: error.message,
  }), {});

export default signIn;
