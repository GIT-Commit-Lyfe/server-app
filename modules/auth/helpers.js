const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

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

module.exports = {
  hashPassword,
  verifyPassword,
  generateToken,
  verifyToken,
  finalEncrypt,
  finalDecrypt,
}