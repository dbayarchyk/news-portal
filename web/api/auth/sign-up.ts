export type SignUpData = {
  email: string;
  password: string;
};

const signUp = async (
  fetch: typeof window.fetch,
  data: SignUpData
): Promise<void | never> => {
  const response = await fetch('/auth/sign-up/', {
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
  response.error.errors.reduce((errors, error) => ({
    ...errors,
    [error.field]: error.message,
  }), {});

export default signUp;
