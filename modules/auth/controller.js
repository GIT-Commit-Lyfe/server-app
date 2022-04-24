const _ = require("lodash");
const { User, UserAuditList, UserAudit } = require("../../models");
const { hashPassword } = require("./helpers");
const log = require('../../utils/log');

async function createAdmin(payload = {}) {
  const defaultPayload = {
    passwordUpdated: false,
    googleConnect: false,
    appleConnect: false,
    facebookConnect: false,
    picture: "",
    config: "",
    RoleId: 1,
    SubscriptionId: 1,
    StatusId: 1,
  }
  const createdAdmin = await User.create({
    ...defaultPayload,
    ...payload,
  })

  return createdAdmin;
}

async function findUserByUsername(username = "") {
  const userFound = await User.findOne({
    where: {
      username,
    }, 
    include: [{ all: true }],
  });

  if (!userFound) {
    return;
  }

  const subscription = _.get(userFound, "Subscription", {});
  const userMapped = Object.assign(
    userFound,
    {
      role: _.get(userFound, "Role.name"),
      status: _.get(userFound, "UserStatus.name"),
      subscription: {
        name: subscription.name,
        value: subscription.value,
      },
    },
  )

  return userMapped;
}

async function findUserByEmail(email = "") {
  const userFound = await User.findOne({
    where: {
      email,
    }, 
    include: [{ all: true }],
  });

  if (!userFound) {
    return;
  }

  const subscription = _.get(userFound, "Subscription", {});
  const userMapped = Object.assign(
    userFound,
    {
      role: _.get(userFound, "Role.name"),
      status: _.get(userFound, "UserStatus.name"),
      subscription: {
        name: subscription.name,
        value: subscription.value,
      },
    },
  )

  return userMapped;
}

async function signUpUser(email, password) {
  const defaultPayload = {
    firstName: "",
    middleName: "",
    lastName: "",
    username: "",
    googleConnect: false,
    appleConnect: false,
    facebookConnect: false,
    mobile: "",
    picture: "",
    config: "",
    RoleId: 3,
    SubscriptionId: 1,
    StatusId: 1,
  }
  const newUser = await User.create({
    ...defaultPayload,
    email,
    password,
  })

  return newUser;
}

async function updateUserByEmail(email = "", payload = {}) {
  const userFound = await findUserByEmail(email);
  if (!userFound) {
    return;
  }

  await userFound.update(payload);

  const subscription = _.get(userFound, "Subscription", {});
  const mappedUser = Object.assign(
    userFound,
    {
      role: _.get(userFound, "Role.name"),
      status: _.get(userFound, "UserStatus.name"),
      subscription: {
        name: subscription.name,
        value: subscription.value,
      },
    }
  )

  return mappedUser;
}

async function changePassword(user, newPassword) {
  const hashed = hashPassword(newPassword);
  await user.update({ password: hashed })
  return true;
}

// AUDIT STATUS
async function createAuditList(newStatus = "newStatus") {
  const newAuditList = await UserAuditList.create({
    name: newStatus,
  })

  return newAuditList;
}
async function createAuditStatus(status, payload = {}) {
  try {
    await UserAudit.create(payload)
    return true;
  } catch (err) {
    log.error(`[AUDIT_STATUS] Encountering error while setting to ${status}`);
    log.error(err);
    return false;
  }
}
const AuditUserStatus = {
  goOffline(userId) {
    const payload = {
      UserId: userId,
      StatusId: 1, // TODO: hardcoded later can use cache to store it
    }
    return createAuditStatus("offline", payload);
  },
  goOnline(userId) {
    const payload = {
      UserId: userId,
      StatusId: 2, // TODO: hardcoded later can use cache to store it
    }
    return createAuditStatus("online", payload);
  },
  loggedIn(userId) {
    const payload = {
      UserId: userId,
      StatusId: 3, // TODO: hardcoded later can use cache to store it
    }
    return createAuditStatus("login", payload);
  },
  loggedOut(userId) {
    const payload = {
      UserId: userId,
      StatusId: 4, // TODO: hardcoded later can use cache to store it
    }
    return createAuditStatus("logout", payload);
  }
}

module.exports = {
  createAdmin,
  findUserByUsername,
  findUserByEmail,
  signUpUser,
  updateUserByEmail,
  changePassword,
  createAuditList,
  AuditUserStatus,
}