import AUTH_SERVICE_API from './api';

export type User = {
  id: string;
  email: string;
  username: string;
};
  
const getCurrentUser = async (headers: Record<string, string>): Promise<User> => {
  const response = await fetch(
    `${AUTH_SERVICE_API}/me/`, { headers }
  );

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
