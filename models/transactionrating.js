'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TransactionRating extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TransactionRating.belongsTo(models.User, { foreignKey: 'UserId' })
      TransactionRating.belongsTo(models.Transaction, { foreignKey: 'TransactionId' })
    }
  };
  TransactionRating.init({
    rating: DataTypes.INTEGER,
    comment: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    TransactionId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'TransactionRating',
  });
  return TransactionRating;
};