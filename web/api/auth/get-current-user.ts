export type User = {
  id: string;
  email: string;
  username: string;
};

const getCurrentUser = async (fetch: typeof window.fetch): Promise<User> => {
  const response = await fetch('/auth/me/');

  switch (response.status) {
    case 200: {
      return response.json();
    }

    default: {
      throw new Error(`Unsupported response status: ${response.status}`);
    }
  }
};

export default getCurrentUser;
