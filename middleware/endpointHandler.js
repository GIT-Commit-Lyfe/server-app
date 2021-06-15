const endpointMap = require("../modules/test/endpointMap");
const log = require("../utils/log");

module.exports = (req, res, next) => {
  const { routePath } = req.params;
  const handlers = endpointMap[routePath];

  if (!handlers) {
    log.warn("undefined :routepath");
    res.status(400).send("undefined /:routepath");
  }

  if (Array.isArray(handlers)) {
    handlers[0](req, res, next);
  } else {
    handlers(req, res, next);
  }

}