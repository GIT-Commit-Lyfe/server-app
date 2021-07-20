const log = require("../../utils/log");

module.exports = {
  ping: [
    (req, res, next) => {
      next();
    },
    (req, res, next) => {
      next();
    },
    (req, res, next) => {
      log.info("PONG");
      res.send("PONG");
    }
  ],
  test: [
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