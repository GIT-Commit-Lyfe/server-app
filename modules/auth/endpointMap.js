const log = require("../../utils/log");
const { cmsAuthorize } = require("./middleware");
const { verifyPassword, generateToken } = require("./helpers");

module.exports = {
  "cms-login": [
    cmsAuthorize,
    async (req, res, next) => {
      if (req.method !== "POST") {
        const message = "invalid method";
        log.warn(message);
        res.status(405).json({ message });
        return;
      }

      const { username, password } = req.body;
      if (!username || !password) {
        const message = "undefined credential";
        log.warn(message);
        res.status(400).json({ message });
        return;
      }

      try {
        const userFound = await findUserByUsername(username);
        if (!userFound) {
          const message = "invalid credential";
          log.warn(message)
          res.status(400).json({ message });
          return;
        }

        const passwordVerified = verifyPassword(password, userFound.password);
        if (!passwordVerified) {
          const message = "invalid credential";
          log.warn(message)
          res.status(400).json({ message });
          return;
        }

        const payload = {
          email: userFound.email,
          name: userFound.name,
          username: userFound.username,
        }

        const token = generateToken(payload);
        res.status(200).json({ token });
      } catch(err) {
        const message = "internal server error";
        log.error(message);
        log.error(err.message);
        log.error(err);
        res.status(400).json({ message });
      }
    }
  ],
  "app-login": [
    (req, res, next) => {
      
    }
  ],
  "app-signup": [
    (req, res, next) => {
      
    }
  ],
}