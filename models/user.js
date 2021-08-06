'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require("../modules/auth/helpers");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Rating, { foreignKey: 'UserId' })
      User.hasMany(models.TransactionRating, { foreignKey: 'UserId' })
      User.hasMany(models.Boutique, { foreignKey: 'UserId' })
      User.belongsTo(models.Role, { foreignKey: 'RoleId' })
      User.belongsTo(models.Subscription, { foreignKey: 'SubscriptionId' })
      User.belongsTo(models.UserStatus, { foreignKey: 'StatusId' })
    }
  };
  User.init({
    firstName: DataTypes.STRING,
    middleName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'required'
        },
        isUnique: async function (email) {
          const data = await User.findOne({ where: { email } });
          if (data) {
            throw new Error('email has been registered');
          }
          return;
        },
        isEmail: function(email) {
          const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          if (!regex.test(email)) {
            throw new Error('not email format');
          }
          return;
        }
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'required'
        },
        isUnique: async function (username) {
          const data = await User.findOne({ where: { username } });
          if (data) {
            throw new Error('username has been registered');
          }
          return;
        }
      }
    },
    password: DataTypes.STRING,
    googleConnect: DataTypes.BOOLEAN,
    appleConnect: DataTypes.BOOLEAN,
    facebookConnect: DataTypes.BOOLEAN,
    mobile: DataTypes.STRING,
    picture: DataTypes.STRING,
    config: DataTypes.STRING,
    RoleId: DataTypes.INTEGER,
    SubscriptionId: DataTypes.INTEGER,
    StatusId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: (user, options) => {
        user.password = hashPassword(user.password);
      },
    },
  });
  return User;
};