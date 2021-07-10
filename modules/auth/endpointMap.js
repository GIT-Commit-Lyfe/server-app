const log = require("../../utils/log");
const { cmsAuthorize } = require("./middleware");

module.exports = {
  "cms-login": [
    cmsAuthorize,
    (req, res, next) => {
      log.info("PONG");
      res.send("PONG");
    }
  ],
  "app-login": [
    (req, res, next) => {
      log.info("message received!");

      const { routeId } = req.params;
      let outputText = "you tested too much.";
      if (routeId) {
        outputText += ` here is your params id => ${routeId}`;
      }
      res.send(outputText);
    }
  ],
  "app-signup": [
    (req, res, next) => {
      log.info("message received!");

      const { routeId } = req.params;
      let outputText = "you tested too much.";
      if (routeId) {
        outputText += ` here is your params id => ${routeId}`;
      }
      res.send(outputText);
    }
  ],
}