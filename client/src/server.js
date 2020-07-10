import sirv from "sirv";
import polka from "polka";
import compression from "compression";
import * as sapper from "@sapper/server";
import fetch from "isomorphic-fetch";

import { refresh } from "./api/auth";
import deriveSessionFromAccessToken from "./utils/auth/deriveSessionFromAccessToken";

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === "development";

async function initServerAccessToken(req, res, next) {
  // Filter out static assets requests like: .js, .css
  // and make sure that we call refresh only when a page is requested
  if (req.url.indexOf(".") !== -1) {
    next();
    return;
  }

  const fetchWithCookies = (url, options) =>
    fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        cookie: req.headers.cookie,
      },
    });

  let serverAccessToken;

  try {
    serverAccessToken = await refresh(fetchWithCookies);
  } catch {
    serverAccessToken = null;
  }

  req.serverAccessToken = serverAccessToken;

  next();
}

polka() // You can also use Express
  .use(
    compression({ threshold: 0 }),
    sirv("static", { dev }),
    initServerAccessToken,
    sapper.middleware({
      session: (req) => deriveSessionFromAccessToken(req.serverAccessToken),
    })
  )
  .listen(PORT, (err) => {
    if (err) console.log("error", err);
  });
