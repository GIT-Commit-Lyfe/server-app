'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bracelet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Bracelet.belongsTo(models.Brand, { foreignKey: 'BrandId' })
      Bracelet.hasMany(models.WatchModel, { foreignKey: 'BraceletId' })
    }
  };
  Bracelet.init({
    name: DataTypes.STRING,
    material: DataTypes.STRING,
    partNumber: DataTypes.STRING,
    color: DataTypes.STRING,
    lugWidth: DataTypes.INTEGER, // mm
    BrandId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Bracelet',
  });
  return Bracelet;
};