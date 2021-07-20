const log = require("../utils/log");

module.exports = (options = { mode: "api" }) => {
  let endpointMap;
  switch (options.mode) {
    case "api":
      endpointMap = require("../modules");
      break;
    case "auth":
      endpointMap = require("../modules/auth/endpointMap");
      break;
    case "dummy":
      endpointMap = require("../modules/dummy/endpointMap");
      break;
    default:
      endpointMap = {};
      break;
  }

  return (req, res, next) => {
    const { routePath } = req.params;
    const handlers = endpointMap[routePath];
  
    if (!handlers || (Array.isArray(handlers) && handlers.length === 0)) {
      log.warn("undefined :routepath");
      res.status(400).send("undefined /:routepath");
      return;
    }
    
    let counter = 0;
    const nextFn = (err) => {
      if (err) {
        next(err);
        return;
      }
      if (Array.isArray(handlers) && counter === handlers.length - 1) {
        next();
        return;
      }
      handlers[++counter](req, res, nextFn);
      return;
    }
    if (Array.isArray(handlers)) {
      handlers[0](req, res, nextFn);
    } else {
      handlers(req, res, next);
    }
  }
}