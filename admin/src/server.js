import sirv from "sirv";
import polka from "polka";
import compression from "compression";
import * as sapper from "@sapper/server";
import fetch from "isomorphic-fetch";

import AuthService from "./services/authService";
import AccessTokenService from "./services/accessTokenService";

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === "development";

async function initServerAccessToken(req, res, next) {
  const fetchWithCookies = (url, options) =>
    fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        cookie: req.headers.cookie,
      },
    });

  const authService = new AuthService(
    fetchWithCookies,
    new AccessTokenService()
  );

  let serverAccessToken;

  try {
    serverAccessToken = await authService.refresh(fetchWithCookies);
  } catch (err) {
    serverAccessToken = null;
  }

  req.serverAccessToken = serverAccessToken;

  next();
}

polka() // You can also use Express
  .use(
    process.env.BASE_URL,
    compression({ threshold: 0 }),
    sirv("static", { dev }),
    initServerAccessToken,
    sapper.middleware({
      session: (req) => ({
        serverAccessToken: req.serverAccessToken,
      }),
    })
  )
  .listen(PORT, (err) => {
    if (err) console.log("error", err);
  });
