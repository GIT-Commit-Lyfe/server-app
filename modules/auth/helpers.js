const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const _ = require("lodash");
const moment = require("moment");

function hashPassword(password) {
  return bcrypt.hashSync(password, salt);
}

function verifyPassword(password, hashedPassword) {
  return bcrypt.compareSync(password, hashedPassword);
}

function generateToken(payload) {
  const secret = process.env.JWT_SECRET;
  const expiresIn = process.env.JWT_EXPIRY  || "24h";
  const encryptedPayload = finalEncrypt(payload);

  return jwt.sign(encryptedPayload, secret, { expiresIn });
}

function verifyToken(token) {
  const secret = process.env.JWT_SECRET;
  try {
    const verified = jwt.verify(token, secret);
    if (!verified.payload) {
      return;
    }

    return finalDecrypt(verified.payload);
  } catch(err) {
    return;
  }
}

const DELIMETER = ":";
function getAlgorithm() {
  const algorithm = process.env.ALGORITHM;
  const valid = crypto.getCiphers().includes(algorithm);
  return valid ? algorithm : "aes-256-cbc";
}
function getIvPayload(encryption) {
  const splitted = encryption.split(DELIMETER);

  if (splitted.length !== 3) {
    return;
  }

  return {
    iv: splitted[1],
    payload: splitted[2],
  }
}

function encrypt(payload, iv) {
  const cipher = crypto.createCipheriv(
    getAlgorithm(),
    process.env.ENCRYPTION_TOKEN,
    iv
  );
  cipher.setAutoPadding(true);
  let encrypted = cipher.update(payload, "utf8", "hex");
  encrypted += cipher.final("hex");
  
  return encrypted;
}
function decrypt(encryption, iv) {
  const decipher = crypto.createDecipheriv(
    getAlgorithm(),
    process.env.ENCRYPTION_TOKEN,
    iv
  );
  decipher.setAutoPadding(true);
  let decrypted = decipher.update(encryption, "hex", "utf8");
  decrypted += decipher.final("utf8");
  
  return decrypted;
}

function finalEncrypt(payload) {
  const iv = crypto.randomBytes(16).toString("hex").slice(0, 16);
  const stringifiedPayload = JSON.stringify(payload);
  const encrypted = encrypt(stringifiedPayload, iv);
  const masking = encrypt(encrypted, iv);

  return { payload: [masking, iv, encrypted].join(DELIMETER) };
}
function finalDecrypt(encryption) {
  const digested = getIvPayload(encryption);
  if (!digested) {
    return;
  }

  const { iv, payload } = digested;
  const decrypted = decrypt(payload, iv);
  
  try {
    const parsed = JSON.parse(decrypted);

    return parsed;
  } catch(err) {
    return;
  }
}

// AUDIT STATUS helpers
const AuditStatus = {
  ONLINE: "online",
  OFFLINE: "offline",
  LOGIN: "login",
  LOGOUT: "logout"
}
function parseAuditStatusList(rawList) {
  return rawList.map((item) => {
    const clonedObj = _.pick(item, ["id", "User", "UserAuditList", "createdAt"])
    const newObj = {
      ...clonedObj,
      userEmail: _.get(item, "User.email", "Unknown"),
      userStatus: _.get(item, "UserAuditList.name", null),
    }
    delete newObj.User;
    delete newObj.UserAuditList;
    return newObj;
  })
}
function evaluateRawList(rawList) {
  const parsedList = parseAuditStatusList(rawList);
  const rawGroupByUser = _.groupBy(parsedList, 'userEmail');
  const groupByUser = {}
  _.forEach(rawGroupByUser, (rawAuditList, userEmail) => {
    let duration = 0;
    let online = null;
    const rawAuditListReversed = _.reverse([...rawAuditList]);
    rawAuditListReversed.forEach((item) => {
      if (!online && item.userStatus === AuditStatus.ONLINE) {
        online = Object.assign({}, item);
      }
      if (online && item.userStatus === AuditStatus.OFFLINE) {
        const onlineMoment = moment(online.createdAt);
        const offlineMoment = moment(item.createdAt);
        const diff = offlineMoment.diff(onlineMoment);
        duration += diff;
        online = null;
      }
      if (_.last(rawAuditListReversed).id === item.id && item.userStatus === AuditStatus.ONLINE) {
        const onlineMoment = moment(online.createdAt);
        const nowMoment = moment();
        const diff = nowMoment.diff(onlineMoment);
        duration += diff;
        online = null;
      }
    })
    groupByUser[userEmail] = duration;
  })

  return { totalTimeByUser: groupByUser, groupByUser: rawGroupByUser };
}

module.exports = {
  hashPassword,
  verifyPassword,
  generateToken,
  verifyToken,
  finalEncrypt,
  finalDecrypt,
  evaluateRawList,
  AuditStatus,
}