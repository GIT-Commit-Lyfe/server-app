const _ = require("lodash");
const { User } = require("../../models");
const { hashPassword } = require("./helpers");

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

module.exports = {
  createAdmin,
  findUserByUsername,
  findUserByEmail,
  signUpUser,
  updateUserByEmail,
  changePassword,
}