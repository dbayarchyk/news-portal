import React from "react";
import App, { AppContext, AppInitialProps } from "next/app";

import SiteLayout from "../components/site-layout";
import { AuthProvider }  from '../context/auth';
import getCurrentUser, { User } from '../api/auth/get-current-user';
import getAPIFetch from '../api/get-api-fetch';
import "../styles/normalize.scss";
import "../styles/theme.scss";
import "../styles/global.scss";

type MyAppInitialProps = AppInitialProps & { currentUser?: User };

class MyApp extends App<MyAppInitialProps> {
  public static async getInitialProps(context: AppContext): Promise<MyAppInitialProps> {
    const pageProps = typeof context.Component.getInitialProps === 'function'
      ? await context.Component.getInitialProps(context.ctx)
      : {};

    try {
      const currentUser = await getCurrentUser(
        getAPIFetch(context.ctx)
      );

      return {
        currentUser,
        pageProps
      }
    } catch (error) {
      return { pageProps };
    }
  }

  public render(): JSX.Element {
    const { Component, pageProps, currentUser } = this.props;

    return (
      <AuthProvider initialCurrentUser={currentUser}>
        <SiteLayout>
          <Component {...pageProps} />
        </SiteLayout>
      </AuthProvider>
    );
  }
}

export default MyApp;
