'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.WatchModel, { foreignKey: 'WatchModelId' })
      Product.belongsTo(models.Condition, { foreignKey: 'ConditionId' })
      Product.belongsTo(models.Accompany, { foreignKey: 'AccompanyId' })
      Product.belongsTo(models.Boutique, { foreignKey: 'BoutiqueId' })
      Product.belongsTo(models.ProductStatus, { foreignKey: 'ProductStatusId' })
      // Product.belongsTo(models.Product, { foreignKey: 'ProductId' })
      // Product.hasMany(models.Product, { foreignKey: 'ProductId' })
    }
  };
  Product.init({
    year: DataTypes.STRING,
    price: DataTypes.INTEGER,
    currency: DataTypes.STRING,
    description: DataTypes.STRING,
    topImage: DataTypes.STRING,
    crownSideImage: DataTypes.STRING,
    caseBackImage: DataTypes.STRING,
    showOffImage: DataTypes.STRING,
    WatchModelId: DataTypes.INTEGER,
    ConditionId: DataTypes.INTEGER,
    AccompanyId: DataTypes.INTEGER,
    BoutiqueId: DataTypes.INTEGER,
    ProductStatusId: DataTypes.INTEGER,
    MatchProductId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};