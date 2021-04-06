import bodyParser from "body-parser";
import "reflect-metadata";
import { InversifyExpressServer } from "inversify-express-utils";

import "./controllers/send-email-controller";

import { iocContainer } from "../../infrastructure/ioc/inversify.config";

const server = new InversifyExpressServer(iocContainer);

server.setConfig((app) => {
  app.use(bodyParser.json());
});

const app = server.build();
const port = 8000;

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`API email service has been started on port ${port}`);
});
