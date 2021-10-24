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
      WatchModel.belongsTo(models.Bezel, { foreignKey: 'BezelId' })
      WatchModel.belongsTo(models.Dial, { foreignKey: 'DialId' })
      WatchModel.belongsTo(models.Bracelet, { foreignKey: 'BraceletId' })
      WatchModel.belongsTo(models.Clasp, { foreignKey: 'ClaspId' })
      WatchModel.belongsTo(models.WatchFunction, { foreignKey: 'WatchFunctionId' })
      WatchModel.hasMany(models.Product, { foreignKey: 'WatchModelId' })
    }
  };
  WatchModel.init({
    referenceNumber: DataTypes.STRING,
    ticker: DataTypes.STRING,
    significantEdition: DataTypes.STRING,
    modelImage: DataTypes.STRING,
    caseMaterial: DataTypes.STRING,
    caseDiameter: DataTypes.INTEGER,
    caseThickness: DataTypes.INTEGER,
    waterResistance: DataTypes.INTEGER,
    crystal: DataTypes.STRING,
    introducedAt: DataTypes.STRING,
    dialNumeral: DataTypes.STRING,
    otherInfo: DataTypes.STRING,
    CollectionId: DataTypes.INTEGER,
    CaliberId: DataTypes.INTEGER,
    MovementId: DataTypes.INTEGER,
    BezelId: DataTypes.INTEGER,
    DialId: DataTypes.INTEGER,
    BraceletId: DataTypes.INTEGER,
    ClaspId: DataTypes.INTEGER,
    WatchFunctionId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'WatchModel',
  });
  return WatchModel;
};