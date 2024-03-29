import bodyParser from "body-parser";
import "reflect-metadata";
import { InversifyExpressServer } from "inversify-express-utils";

import "./controllers/comment-controller";

import { iocContainer } from "../ioc/inversify.config";
import { connect } from "../persistence/mongoose/connect";

connect(process.env.MONGODB_URL || "");

const server = new InversifyExpressServer(iocContainer);

server.setConfig((app) => {
  app.use(bodyParser.json());
});

const app = server.build();
const port = process.env.PORT || 8000;

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`API comment service has been started on port ${port}`);
});
