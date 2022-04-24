'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserAudit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserAudit.belongsTo(models.User, { foreignKey: 'UserId' })
      UserAudit.belongsTo(models.UserAuditList, { foreignKey: 'StatusId' })
    }
  };
  UserAudit.init({
    UserId: DataTypes.INTEGER,
    StatusId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserAudit',
  });
  return UserAudit;
};