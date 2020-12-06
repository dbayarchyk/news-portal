import React from "react";
import Head from "next/head";

const GoogleAnalytics: React.FC = () => {
  // TODO: uncomment when release the app.
  // if (process.env.NODE_ENV !== "production") {
  //   return null;
  // }

  if (!process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_TRACKING_ID) {
    // eslint-disable-next-line no-console
    console.error("Google analytics tracking id is not provided");
    return null;
  }

  return (
    <Head>
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_TRACKING_ID}`}></script>
      <script dangerouslySetInnerHTML={{
        __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        
          gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_TRACKING_ID}'); 
      `}}/>
    </Head>
  );
};

export default GoogleAnalytics;
