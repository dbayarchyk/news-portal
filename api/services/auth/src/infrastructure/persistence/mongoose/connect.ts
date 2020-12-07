import { connect as baseConnect } from "mongoose";

export async function connect(url: string): Promise<void> {
  // TODO: remove ?retryWrites=false when mlab won't complain.
  // https://stackoverflow.com/questions/55878421/how-to-solve-this-transaction-error-in-mlab-mongoerror-transaction-numbers-ar
  await baseConnect(`${url}?retryWrites=false`, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
}
