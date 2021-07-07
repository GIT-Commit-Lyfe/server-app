'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductStatus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProductStatus.hasMany(models.Product, { foreignKey: 'ProductStatusId' })
    }
  };
  ProductStatus.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ProductStatus',
  });
  return ProductStatus;
};