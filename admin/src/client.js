import * as sapper from "@sapper/app";

import { setInMemoryAccessToken } from "./utils/accessToken";

if (window.__SAPPER__) {
  setInMemoryAccessToken(window.__SAPPER__.session.serverAccessToken);
}

sapper.start({
  target: document.querySelector("#sapper"),
});
