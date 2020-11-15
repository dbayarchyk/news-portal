import { useContext } from 'react';

import AuthContext, { AuthContextValue } from './auth-context';

const useAuth = (): AuthContextValue => {
  const auth = useContext(AuthContext);

  return auth;
};

export default useAuth;
