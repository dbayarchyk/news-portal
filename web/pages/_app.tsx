import React from "react";
import App from "next/app";

import SiteLayout from "../components/site-layout";

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
