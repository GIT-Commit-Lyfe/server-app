'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BezelMaterial extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      BezelMaterial.hasMany(models.WatchModel, { foreignKey: 'BezelMaterialId' })
    }
  };
  BezelMaterial.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'BezelMaterial',
  });
  return BezelMaterial;
};