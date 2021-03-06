'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TransactionInfo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TransactionInfo.belongsTo(models.Transaction, { foreignKey: 'TransactionId' })
      TransactionInfo.belongsTo(models.TransactionStatus, { foreignKey: 'StatusId' })
    }
  };
  TransactionInfo.init({
    description: DataTypes.STRING,
    TransactionId: DataTypes.INTEGER,
    StatusId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'TransactionInfo',
  });
  return TransactionInfo;
};