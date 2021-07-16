const _ = require("lodash");
const log = require("../../utils/log");
const { cmsAuthorize } = require("./middleware");
const { verifyPassword, generateToken } = require("./helpers");

module.exports = {
  "cms-login": [
    cmsAuthorize,
    async (req, res, next) => {
      if (req.method !== "POST") {
        const message = "[cms-login]:invalid method";
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
          const message = "[cms-login]:invalid credential";
          log.warn(message)
          res.status(400).json({ message });
          return;
        }

        const passwordVerified = verifyPassword(password, userFound.password);
        if (!passwordVerified) {
          const message = "[cms-login]:invalid credential";
          log.warn(message)
          res.status(400).json({ message });
          return;
        }

        const isAdmin = userFound.role === "admin";
        if (!isAdmin) {
          const message = "[cms-login]:unauthorized role";
          log.warn(message)
          res.status(401).json({ message });
          return;
        }

        const payload = {
          email: userFound.email,
          name: userFound.name,
          username: userFound.username,
          role: userFound.role,
          status: updatedUser.status,
        }

        const token = generateToken(payload);
        res.status(200).json({ token });
      } catch(err) {
        const message = "[cms-login]:internal server error";
        log.error(message);
        log.error(err.message);
        log.error(err);
        res.status(400).json({ message });
      }
    }
  ],
  "app-login": [
    (req, res, next) => {
      if (req.method !== "POST") {
        const message = "[app-login]:invalid method";
        log.warn(message);
        res.status(405).json({ message });
        return;
      }

      const { email, username, password } = req.body;
      if (!((username || email) && password)) {
        const message = "[app-login]:undefined credential";
        log.warn(message);
        res.status(400).json({ message });
        return;
      }

      try {
        let userFound;
        if (username) {
          userFound = await findUserByUsername(username);
        } else {
          userFound = await findUserByEmail(username);
        }

        if (!userFound) {
          const message = "[app-login]:invalid credential";
          log.warn(message)
          res.status(400).json({ message });
          return;
        }

        const passwordVerified = verifyPassword(password, userFound.password);
        if (!passwordVerified) {
          const message = "[app-login]:invalid credential";
          log.warn(message)
          res.status(400).json({ message });
          return;
        }

        const payload = {
          email: userFound.email,
          name: userFound.name,
          username: userFound.username,
          role: userFound.role,
          status: updatedUser.status,
        }

        const token = generateToken(payload);
        res.status(200).json({ token });
      } catch(err) {
        const message = "[app-login]:internal server error";
        log.error(message);
        log.error(err.message);
        log.error(err);
        res.status(400).json({ message });
      }
    }
  ],
  "app-signup": [
    (req, res, next) => {
      if (req.method !== "POST") {
        const message = "[app-signup]:invalid method";
        log.warn(message);
        res.status(405).json({ message });
        return;
      }

      const { email, password } = req.body;
      if (!(email && password)) {
        const message = "[app-signup]:bad request";
        log.warn(message);
        res.status(400).json({ message });
        return;
      }

      try {
        const newUser = await signUpUser(email, password);
        const payload = {
          email: newUser.email,
        }

        const token = generateToken(payload);
        res.status(200).json({ token });
      } catch(err) {
        const message = "[app-signup]:internal server error";
        log.error(message);
        log.error(err.message);
        log.error(err);
        res.status(400).json({ message });
      }
    }
  ],
  "app-onboard": [
    verifyingToken,
    (req, res, next) => {
      if (req.method !== "POST") {
        const message = "[app-onboard]:invalid method";
        log.warn(message);
        res.status(405).json({ message });
        return;
      }

      const { firstName, middleName, lastName, username, mobile } = req.body;
      if (!(firstName && middleName && lastName && username && mobile)) {
        const message = "[app-onboard]:bad request";
        log.warn(message);
        res.status(400).json({ message });
        return;
      }

      try {
        const email = _.get(req, "user.email");
        if (!email) {
          const message = "[app-onboard]:bad token request";
          log.warn(message);
          res.status(400).json({ message });
          return;
        }

        const payload = { firstName, middleName, lastName, username, mobile };
        const updatedUser = await updateUserByEmail(email, payload);
        const tokenPayload = {
          email: updatedUser.email,
          name: updatedUser.name,
          username: updatedUser.username,
          role: updatedUser.role,
          status: updatedUser.status,
        }

        const token = generateToken(tokenPayload);
        res.status(200).json({ token });
      } catch(err) {
        const message = "[app-onboard]:internal server error";
        log.error(message);
        log.error(err.message);
        log.error(err);
        res.status(400).json({ message });
      }
    }
  ],
}