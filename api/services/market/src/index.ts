import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import { router } from "./routes";
import { connect } from "./database/connect";

connect(process.env.MONGODB_URL || "");

const app = express();

if (process.env.NODE_ENV !== "production") {
  app.use(cors());
}

app.use(bodyParser.json());
app.use(router);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`API market service has been started on port ${port}`);
});
