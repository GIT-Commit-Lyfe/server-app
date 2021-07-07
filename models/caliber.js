'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Caliber extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Caliber.belongsTo(models.Brand, { foreignKey: 'BrandId' })
      Caliber.hasMany(models.WatchModel, { foreignKey: 'CaliberId' })
    }
  };
  Caliber.init({
    name: DataTypes.STRING,
    BrandId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Caliber',
  });
  return Caliber;
};