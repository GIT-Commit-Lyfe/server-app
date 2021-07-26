const _ = require("lodash");

module.exports = (req, res, next) => {
  const origin = _.get(req, "headers.origin");

  if (origin && process.env.CORS_WHITELIST_ENABLE) {
    let corsWhitelist = [
      "http://localhost:3000",
      process.env.BASE_URL,
    ];
    if (process.env.CORS_WHITELIST_URLS) {
      corsWhitelist = corsWhitelist.concat(process.env.CORS_WHITELIST_URLS.split(","));
    }
    if (!corsWhitelist.includes(origin)) {
      res.sendStatus(401);
      return;
    }
  }

  if (origin) {
    res.header("Access-Control-Allow-Origin", origin);
  }

  res.header("Access-Control-Allow-Methods", ["POST", "PATCH", "DELETE"]);
  res.header("Access-Control-Allow-Headers", "authorization,authorization-client,content-type");
  res.header("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    res.setHeader("Content-Type", "application/json");
    next();
  }
};
