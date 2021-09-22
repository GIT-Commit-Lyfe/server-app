const _ = require("lodash");
const passport = require("passport");
const cuid = require("cuid");
const log = require("../../utils/log");
const { cmsAuthorize, verifyingToken, authenticate } = require("./middleware");
const { verifyPassword, generateToken } = require("./helpers");
const { createAdmin, findUserByUsername, findUserByEmail, signUpUser, updateUserByEmail, changePassword } = require("./controller");

module.exports = {
  "get-token": [
    (req, res, next) => {
      if (req.method !== "GET") {
        const message = "[get-token]:invalid method";
        log.warn(message);
        res.status(405).json({ message });
        return;
      }

      const { tokenType } = req.query;
      let token;
      switch (tokenType) {
        case "cms":
          token = process.env.CMS_TOKEN;
          break;
        default:
          break;
      }

      if (!token) {
        const message = "[get-token]:undefined type";
        log.warn(message);
        res.status(400).json({ message });
        return;
      }
      res.status(200).json({ token });
    }
  ],
  "cms-signup": [
    passport.authenticate("basic", { session: false }),
    async (req, res, next) => {
      if (req.method !== "POST") {
        const message = "[cms-signup]:invalid method";
        log.warn(message);
        res.status(405).json({ message });
        return;
      }
      
      const pickProperties = [ "email", "username", "password", "firstName", "middleName", "lastName", "mobile" ];
      const payload = _.pick(req.body, pickProperties);
      const payloadKeys = Object.keys(payload);
      const diffKeys = _.difference(pickProperties, payloadKeys);
      if (diffKeys.length > 1) {
        const message = "[cms-signup]:missing properties";
        log.warn(message);
        res.status(400).json({ message, missing: diffKeys });
        return;
      }

      try {
        await createAdmin(payload);
        res.status(200).json({ message: "admin created" });
      } catch (err) {
        if (err.name === "SequelizeValidationError") {
          const reasons = err.message.replace(/Validation error: /g, "").split("\n");
          const message = "[cms-signup]:ValidationError";
          log.error(message);
          log.error(err);
          res.status(400).json({ message, reasons });
          return;
        }
        const message = "[cms-signup]:internal server error";
        log.error(message);
        log.error(err.message);
        log.error(err);
        res.status(500).json({ message });
      }
    }
  ],
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
        const message = "[cms-login]:undefined credential";
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

        const isAdmin = userFound.role === "admin" || userFound.role === "master";
        if (!isAdmin) {
          const message = "[cms-login]:unauthorized role";
          log.warn(message);
          res.status(401).json({ message });
          return;
        }

        // for user change password, need to login again to update this to be false again
        if (userFound.passwordUpdated) {
          await userFound.update({ passwordUpdated: false });
        }

        const payload = {
          email: userFound.email,
          name: userFound.name,
          username: userFound.username,
          role: userFound.role,
          status: userFound.status,
          subscription: userFound.subscription,
        }

        const token = generateToken(payload);
        res.status(200).json({ token });
      } catch (err) {
        const message = "[cms-login]:internal server error";
        log.error(message);
        log.error(err.message);
        log.error(err);
        res.status(500).json({ message });
      }
    }
  ],
  "app-login": [
    async (req, res, next) => {
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
          userFound = await findUserByEmail(email);
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

        // for user change password, need to login again to update this to be false again
        if (userFound.passwordUpdated) {
          await userFound.update({ passwordUpdated: false });
        }

        const payload = {
          email: userFound.email,
          name: userFound.name,
          username: userFound.username,
          role: userFound.role,
          status: userFound.status,
          subscription: userFound.subscription,
        }

        const token = generateToken(payload);
        res.status(200).json({ token });
      } catch (err) {
        const message = "[app-login]:internal server error";
        log.error(message);
        log.error(err.message);
        log.error(err);
        res.status(500).json({ message });
      }
    }
  ],
  "app-signup": [
    async (req, res, next) => {
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
      } catch (err) {
        if (err.name === "SequelizeValidationError") {
          const reasons = err.message.replace(/Validation error: /g, "").split("\n");
          const message = "[cms-signup]:ValidationError";
          log.error(message);
          log.error(err);
          res.status(400).json({ message, reasons });
          return;
        }
        const message = "[app-signup]:internal server error";
        log.error(message);
        log.error(err.message);
        log.error(err);
        res.status(500).json({ message });
      }
    }
  ],
  "app-onboard": [
    verifyingToken,
    async (req, res, next) => {
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

        if (!updatedUser) {
          const message = "[app-onboard]:user no found";
          log.warn(message);
          res.status(400).json({ message });
          return;
        }

        const tokenPayload = {
          email: updatedUser.email,
          name: updatedUser.name,
          username: updatedUser.username,
          role: updatedUser.role,
          status: updatedUser.status,
          subscription: updatedUser.subscription,
        }

        const token = generateToken(tokenPayload);
        res.status(200).json({ token });
      } catch (err) {
        if (err.name === "SequelizeValidationError") {
          const reasons = err.message.replace(/Validation error: /g, "").split("\n");
          const message = "[cms-signup]:ValidationError";
          log.error(message);
          log.error(err);
          res.status(400).json({ message, reasons });
          return;
        }
        const message = "[app-onboard]:internal server error";
        log.error(message);
        log.error(err.message);
        log.error(err);
        res.status(500).json({ message });
      }
    }
  ],
  "verify-token": [
    ...authenticate,
    async (req, res, next) => {
      if (req.method !== "GET") {
        const message = "[verify-token]:invalid method";
        log.warn(message);
        res.status(405).json({ message });
        return;
      }

      if (!req.user) {
        const message = "[verify-token]:empty user info";
        log.warn(message);
        res.status(400).json({ message });
        return;
      }

      const payload = Object.assign({}, req.user);
      res.status(200).json({ payload });
    }
  ],
  "verify-user": [
    verifyingToken,
    async (req, res, next) => {
      if (req.method !== "GET") {
        const message = "[verify-user]:invalid method";
        log.warn(message);
        res.status(405).json({ message });
        return;
      }

      if (!req.user || !req.userDetails) {
        const message = "[verify-user]:empty user info";
        log.warn(message);
        res.status(400).json({ message });
        return;
      }
    
      if (req.userDetails.status === "verified") {
        res.status(200).json({ message: "user already verified!" });
        return;
      };
      await req.userDetails.update({ StatusId: 2 });

      res.status(200).json({ message: "user verified!" });
    }
  ],
  "change-password": [
    verifyingToken,
    async (req, res, next) => {
      if (req.method !== "POST") {
        const message = "[change-password]:invalid method";
        log.warn(message);
        res.status(405).json({ message });
        return;
      }

      if (!req.user) {
        const message = "[change-password]:empty user info";
        log.warn(message);
        res.status(400).json({ message });
        return;
      }
      
      const { password, newPassword } = req.body;
      const { email } = req.user;

      if (!password || !newPassword) {
        const message = "[change-password]:undefined credential";
        log.warn(message);
        res.status(400).json({ message });
        return;
      }

      try {
        const userFound = await findUserByEmail(email);
        if (!userFound) {
          const message = "[change-password]:invalid credential";
          log.warn(message)
          res.status(400).json({ message });
          return;
        }

        const passwordVerified = verifyPassword(password, userFound.password);
        if (!passwordVerified) {
          const message = "[change-password]:invalid credential";
          log.warn(message)
          res.status(400).json({ message });
          return;
        }

        await changePassword(userFound, newPassword);

        // will be used in middleware verifying token check if password updated
        await userFound.update({ passwordUpdated: true });

        res.status(200).json({ message: "password updated" });
      } catch (err) {
        const message = "[cms-login]:internal server error";
        log.error(message);
        log.error(err.message);
        log.error(err);
        res.status(500).json({ message });
      }
    }
  ],
  "reset-password": [
    async (req, res, next) => {
      if (req.method !== "POST") {
        const message = "[reset-password]:invalid method";
        log.warn(message);
        res.status(405).json({ message });
        return;
      }

      const { email } = req.body;
      if (!email) {
        const message = "[reset-password]:undefined email";
        log.warn(message)
        res.status(400).json({ message });
        return;
      }

      try {
        const userFound = await findUserByEmail(email);
        if (!userFound) {
          const message = "[reset-password]:email never registered";
          log.warn(message)
          res.status(400).json({ message });
          return;
        }

        const newPassword = cuid();
        await changePassword(userFound, newPassword);
        // will be used in middleware verifying token check if password updated
        await userFound.update({ passwordUpdated: true });

        res.status(200).json({ message: `password resetted, new password: ${newPassword}, please save it somewhere!` });
      } catch (err) {
        const message = "[cms-login]:internal server error";
        log.error(message);
        log.error(err.message);
        log.error(err);
        res.status(500).json({ message });
      }
    }
  ]
}