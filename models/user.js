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
    email: DataTypes.STRING,
    username: DataTypes.STRING,
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