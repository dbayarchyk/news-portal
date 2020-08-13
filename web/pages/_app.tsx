import React from "react";
import App from "next/app";

import SiteLayout from "../components/site-layout";
import "../styles/normalize.scss";
import "../styles/theme.scss";
import "../styles/global.scss";

class MyApp extends App {
  public render() {
    const { Component, pageProps } = this.props;

    return (
      <SiteLayout>
        <Component {...pageProps} />
      </SiteLayout>
    );
  }
}

export default MyApp;
