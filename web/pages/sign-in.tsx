import React from "react";
import Head from "next/head";

import SignInForm from "../components/sign-in-form";
import { getHeadTitle } from "../utils/head-title";
import styles from "./sign-in.module.scss";

const SignInPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>{getHeadTitle("Sign In")}</title>
      </Head>

      <div className={styles.container}>
        <SignInForm />
      </div>
    </>
  );
};

export default SignInPage;
