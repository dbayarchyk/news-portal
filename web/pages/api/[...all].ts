import { NextApiRequest, NextApiResponse } from "next";
import httpProxyMiddleware from "next-http-proxy-middleware";

export default (req: NextApiRequest, res: NextApiResponse) => {
  const isDevelopment = true;

  if (isDevelopment) {
    return httpProxyMiddleware(req, res, {
      // You can use the `http-proxy` option
      target: "http://localhost:8000",
      // In addition, you can use the `pathRewrite` option provided by `next-http-proxy`
      pathRewrite: {
        "^/api/comment": "",
      },
    });
  }

  return res.status(404).send(null);
};
