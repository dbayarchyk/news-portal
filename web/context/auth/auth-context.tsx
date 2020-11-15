import { createContext } from 'react';

type Actions = {
  signIn: (currentUser: CurrentUser) => void;
  signOut: () => void;
};
export type CurrentUser = {
  id: string;
  username: string;
  email: string;
};
type SignedInValue = {
  isSignedIn: true;
  currentUser: CurrentUser;
};
type SignedOutValue = {
  isSignedIn: false;
};
export type AuthContextValue = Actions & (SignedInValue | SignedOutValue);

const AuthContext = createContext<AuthContextValue>({
  isSignedIn: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  signIn: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  signOut: () => {},
});

export default AuthContext;
