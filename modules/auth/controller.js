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
    email,
    password,
    ...defaultPayload,
  })

  return newUser;
}

module.exports = {
  findUserByUsername,
  findUserByEmail,
  signUpUser,
}