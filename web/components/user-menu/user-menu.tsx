import React from 'react';

import SignInLink from '../sign-in-link';
import { useAuth } from '../../context/auth';
import styles from "./user-menu.module.scss";

const UserMenu: React.FC = () => {
  const auth = useAuth();

  return (
    <div>
      {auth.isSignedIn ? auth.currentUser.username : <SignInLink className={styles.link} />}
    </div>
  );
};

export default UserMenu;
