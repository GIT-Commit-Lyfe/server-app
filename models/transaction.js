'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction.hasMany(models.TransactionInfo, { foreignKey: 'TransactionId' })
      Transaction.hasMany(models.TransactionRating, { foreignKey: 'TransactionId' })

      Transaction.belongsTo(models.TransactionStatus, { foreignKey: 'StatusId' })
      Transaction.belongsTo(models.Product, { foreignKey: 'sellerProductId' })
      Transaction.belongsTo(models.Product, { foreignKey: 'buyerProductId' })
    }
  };
  Transaction.init({
    price: DataTypes.INTEGER,
    currencry: DataTypes.STRING,
    StatusId: DataTypes.INTEGER,
    BuyerProductId: DataTypes.INTEGER,
    SellerProductId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};