'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DialMaterial extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      DialMaterial.hasMany(models.WatchModel, { foreignKey: 'DialMaterialId' })
    }
  };
  DialMaterial.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'DialMaterial',
  });
  return DialMaterial;
};