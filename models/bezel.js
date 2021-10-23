'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bezel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Bezel.belongsTo(models.Brand, { foreignKey: 'BrandId' })
      Bezel.hasMany(models.WatchModel, { foreignKey: 'BezelId' })
    }
  };
  Bezel.init({
    name: DataTypes.STRING,
    material: DataTypes.STRING,
    partNumber: DataTypes.STRING,
    color: DataTypes.STRING,
    BrandId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Bezel',
  });
  return Bezel;
};