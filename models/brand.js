'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Brand extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Brand.hasMany(models.Collection, { foreignKey: 'BrandId' })
      Brand.hasMany(models.Caliber, { foreignKey: 'BrandId' })
    }
  };
  Brand.init({
    name: DataTypes.STRING,
    site: DataTypes.STRING,
    description: DataTypes.STRING(2040),
    logoImage: DataTypes.STRING,
    isWatch: DataTypes.BOOLEAN,
    isPremium: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Brand',
  });
  return Brand;
};