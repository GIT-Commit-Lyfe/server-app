const _ = require("lodash");
const log = require("../../utils/log");
const { verifyToken } = require("./helpers");
const { findUserByEmail } = require("./controller");

const cmsAuthorize = (req, res, next) => {
  const accessToken = _.get(req, "headers.authorization") || _.get(req, "body.auth");
  if (!accessToken) {
    const message = "token not found";
    log.warn(message);
    res.status(401).json({ message });
    return;
  }

  const bearerToken = _.includes(accessToken, "Bearer");
  const masterToken = process.env.CMS_TOKEN;
  const token = accessToken.replace("Bearer ", "");
  const tokenAuthorized = token === masterToken;
  if (!bearerToken || !tokenAuthorized) {
    const message = "invalid token";
    log.warn(message);
    res.status(401).json({ message });
    return;
  }

  next();
}

const verifyingToken = async (req, res, next) => {
  const accessToken = _.get(req, "headers.authorization", "");
  if (!accessToken) {
    const message = "token not found";
    log.warn(message);
    res.status(401).json({ message });
    return;
  }

  const bearerToken = _.includes(accessToken, "Bearer");
  const token = accessToken.replace("Bearer ", "");
  const verified = verifyToken(token);

  if (!bearerToken || !verified) {
    const message = "invalid token";
    log.warn(message);
    res.status(401).json({ message });
    return;
  }

  const userFound = await findUserByEmail(verified.email);
  if (!userFound) {
    const message = "unidentified token";
    log.warn(message)
    res.status(401).json({ message });
    return;
  }

  if (userFound.passwordUpdated) {
    const message = "unauthorized token";
    log.warn(message)
    res.status(400).json({ message });
    return;
  }

  req.user = Object.assign({}, verified);

  next();
}

module.exports = {
  cmsAuthorize,
  verifyingToken,
}