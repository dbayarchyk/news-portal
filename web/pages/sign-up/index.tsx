import React from "react";
import Head from "next/head";

import SignUpForm from "../../components/sign-up/sign-up-form";
import { getHeadTitle } from "../../utils/head-title";
import styles from "./index.module.scss";

const SignUpPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>{getHeadTitle("Sign Up")}</title>
      </Head>

      <div className={styles.container}>
        <SignUpForm />
      </div>
    </>
  );
};

export default SignUpPage;
