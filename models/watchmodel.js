'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class WatchModel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      WatchModel.belongsTo(models.Collection, { foreignKey: 'CollectionId' })
      WatchModel.belongsTo(models.Caliber, { foreignKey: 'CaliberId' })
      WatchModel.belongsTo(models.Movement, { foreignKey: 'MovementId' })
      WatchModel.belongsTo(models.BezelMaterial, { foreignKey: 'BezelMaterialId' })
      WatchModel.belongsTo(models.DialMaterial, { foreignKey: 'DialMaterialId' })
      WatchModel.belongsTo(models.BraceletMaterial, { foreignKey: 'BraceletMaterialId' })
      WatchModel.belongsTo(models.BraceletColor, { foreignKey: 'BraceletColorId' })
      WatchModel.belongsTo(models.Clasp, { foreignKey: 'ClaspId' })
      WatchModel.belongsTo(models.ClaspMaterial, { foreignKey: 'ClaspMaterialId' })
      WatchModel.belongsTo(models.Function, { foreignKey: 'FunctionId' })
      WatchModel.hasMany(models.Product, { foreignKey: 'ReferenceId' })
    }
  };
  WatchModel.init({
    referenceNumber: DataTypes.STRING,
    caseMaterial: DataTypes.STRING,
    caseDiameter: DataTypes.INTEGER,
    caseThickness: DataTypes.INTEGER,
    waterResistance: DataTypes.INTEGER,
    glass: DataTypes.STRING,
    streetName: DataTypes.STRING,
    lugWidth: DataTypes.STRING,
    introducedAt: DataTypes.STRING,
    powerReserved: DataTypes.INTEGER,
    numberOfJewel: DataTypes.INTEGER,
    dialNumeral: DataTypes.STRING,
    otherInfo: DataTypes.STRING,
    CollectionId: DataTypes.INTEGER,
    CaliberId: DataTypes.INTEGER,
    MovementId: DataTypes.INTEGER,
    BezelMaterialId: DataTypes.INTEGER,
    DialMaterialId: DataTypes.INTEGER,
    BraceletMaterialId: DataTypes.INTEGER,
    BraceletColorId: DataTypes.INTEGER,
    ClaspId: DataTypes.INTEGER,
    ClaspMaterialId: DataTypes.INTEGER,
    FunctionId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'WatchModel',
  });
  return WatchModel;
};