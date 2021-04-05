import Document, {
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";
import React from "react";

class AppDocument extends Document {
  public render(): React.ReactElement {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default AppDocument;
