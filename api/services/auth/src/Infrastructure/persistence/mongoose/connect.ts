import { connect as baseConnect } from "mongoose";

export async function connect(url: string): Promise<void> {
  await baseConnect(url, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
}
