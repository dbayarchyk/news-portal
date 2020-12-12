import React from 'react';
import { useRouter } from "next/router";

import SignInLink from '../sign-in-link';
import { useAuth } from '../../context/auth';
import styles from "./user-menu.module.scss";

const PAGES_WITHOUT_USER_SPECIFIC_ACTIONS = ["/salaries/share"];

const UserMenu: React.FC = () => {
  const auth = useAuth();
  const router = useRouter();

  /* Don't show user specific actions on a page to provide an anonymous feeling. */
  if (PAGES_WITHOUT_USER_SPECIFIC_ACTIONS.includes(router.pathname)) {
    return <div/>;
  }

  return (
    <div>
      {auth.isSignedIn ? auth.currentUser.username : <SignInLink className={styles.link} />}
    </div>
  );
};

export default UserMenu;
