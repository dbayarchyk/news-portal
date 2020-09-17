import * as React from "react";

type Fragments<TKeys extends string> = { [key in TKeys]?: string };
type WithFragments<TProps extends Record<string, unknown>> = {
  fragments: Fragments<keyof TProps>;
};

declare module "react" {
  export type FC<P = Record<string, unknown>> = React.FC<P> & WithFragments<P>;
  export type FCWithFragments<P> = React.FC<P> & WithFragments<P>;
}
