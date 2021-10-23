'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Clasp extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Clasp.belongsTo(models.Brand, { foreignKey: 'BrandId' })
      Clasp.hasMany(models.WatchModel, { foreignKey: 'ClaspId' })
    }
  };
  Clasp.init({
    name: DataTypes.STRING,
    material: DataTypes.STRING,
    partNumber: DataTypes.STRING,
    color: DataTypes.STRING,
    width: DataTypes.INTEGER, // mm
    BrandId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Clasp',
  });
  return Clasp;
};