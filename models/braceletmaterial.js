'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BraceletMaterial extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      BraceletMaterial.hasMany(models.WatchModel, { foreignKey: 'BraceletMaterialId' })
    }
  };
  BraceletMaterial.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'BraceletMaterial',
  });
  return BraceletMaterial;
};