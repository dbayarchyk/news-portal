import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import "reflect-metadata";
import { InversifyExpressServer } from "inversify-express-utils";

import "./controllers/sign-up-controller";
import "./controllers/sign-in-controller";
import "./controllers/get-current-user-controller";

import { iocContainer } from "../../infrastructure/ioc/inversify.config";
import { connect } from "../../infrastructure/persistence/mongoose/connect";

connect(process.env.MONGODB_URL || "");

const server = new InversifyExpressServer(iocContainer);

server.setConfig((app) => {
  app.use(bodyParser.json());
  app.use(cookieParser())
});

const app = server.build();
const port = 8000;

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`API auth service has been started on port ${port}`);
});
