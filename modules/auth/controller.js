const _ = require("lodash");
const log = require("../../utils/log");
const { User } = require("../../models");

async function findUserByUsername(username) {
  const userFound= await User.findOne({
    where: {
      username,
    }, 
  }, {
    include: [{ all: true }]
  })

  const userMapped = Object.assign(
    userFound,
    {
      role: _.get(userFound, "Role.name"),
      status: _.get(userFound, "UserStatus.name"),
      subscription: _.get(userFound, "Subscription"),
    },
  )

  return userMapped;
}

async function findUserByEmail(email) {
  const userFound= await User.findOne({
    where: {
      email,
    }, 
  }, {
    include: [{ all: true }]
  })

  const userMapped = Object.assign(
    userFound,
    {
      role: _.get(userFound, "Role.name"),
      status: _.get(userFound, "UserStatus.name"),
      subscription: _.get(userFound, "Subscription"),
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
    RoleId: 2,
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

async function updateUserByEmail(email, payload) {
  const updatedUser = await User.update(payload, {
    where: {
      email,
    },
  }, {
    include: [{ all: true }]
  })

  const mappedUser = Object.assign(
    updatedUser,
    {
      role: _.get(updatedUser, "Role.name"),
      status: _.get(updatedUser, "UserStatus.name"),
      subscription: _.get(updatedUser, "Subscription"),
    }
  )

  return mappedUser;
}

module.exports = {
  findUserByUsername,
  findUserByEmail,
  signUpUser,
  updateUserByEmail,
}