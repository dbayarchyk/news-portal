import * as sapper from "@sapper/app";

import AccessTokenService from "./services/accessTokenService";

const accessTokenService = new AccessTokenService();

accessTokenService.setInMemoryToken(
  window.__SAPPER__.session.serverAccessToken
);

sapper.start({
  target: document.querySelector("#sapper"),
});
