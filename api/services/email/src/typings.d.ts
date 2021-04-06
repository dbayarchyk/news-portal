import * as React from "react";

declare global {
  export type EmailFC<P = Record<string, unknown>> = React.FC<P> & {
    sampleProps: P;
    propTypes: NonNullable<React.FC["propTypes"]>;
    subject: string;
  };
}
