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
  const paramToken = _.get(req, "query.auth", "");
  const headerToken = _.get(req, "headers.authorization", "");
  const accessToken = req.params.routePath === "verify-user" ? "Bearer " + paramToken : headerToken;
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
    res.status(401).json({ message });
    return;
  }

  req.user = Object.assign({}, verified);
  req.userDetails = userFound;

  next();
}

const checkStatus = (req, res, next) => {
  if (!req.user || !req.userDetails) {
    const message = "empty user info";
    log.warn(message);
    res.status(401).json({ message });
    return;
  }

  if (req.userDetails.status === "blocked") {
    const message = "user is blocked";
    log.warn(message);
    res.status(401).json({ message });
    return;
  }

  if (req.user.status !== req.userDetails.status) {
    const message = "user status not updated, login again";
    log.warn(message);
    res.status(401).json({ message });
    return;
  }

  next();
}

const authenticate = [
  verifyingToken,
  checkStatus,
]

module.exports = {
  cmsAuthorize,
  verifyingToken,
  checkStatus,
  authenticate,
}