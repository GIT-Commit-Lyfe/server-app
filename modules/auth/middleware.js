const _ = require("lodash");
const log = require("../../utils/log");

const cmsAuthorize = (req, res, next) => {
  const accessToken = _.get(req, "headers.authorization", "");
  if (!accessToken) {
    const message = "token not found";
    log.warn(message);
    res.status(401).json({ error: "Unauthorized", message });
    return;
  }

  const bearerToken = _.includes(accessToken, "Bearer");
  const masterToken = process.env.CMS_TOKEN;
  const token = accessToken.replace("Bearer ", "");
  const tokenAuthorized = token === masterToken;
  if (!bearerToken || !tokenAuthorized) {
    const message = "invalid token";
    log.warn(message);
    res.status(401).json({ error: "Unauthorized", message });
    return;
  }

  next();
}

module.exports = {
  cmsAuthorize,
}