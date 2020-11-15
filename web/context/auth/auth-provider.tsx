import React, { useState } from 'react';

import AuthContext, { AuthContextValue , CurrentUser } from './auth-context';

type AuthProviderProps = {
  initialCurrentUser?: CurrentUser | null;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children, initialCurrentUser = null }) => {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(initialCurrentUser);

  const signIn = (currentUser: CurrentUser) => {
    setCurrentUser(currentUser);
  };

  const signOut = () => {
    setCurrentUser(null);
  };

  const contextValue: AuthContextValue = currentUser !== null ? {
    isSignedIn: true,
    currentUser,
    signIn,
    signOut,
  } : {
    isSignedIn: false,
    signIn,
    signOut,
  };

  return (
    <AuthContext.Provider
      value={contextValue}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
