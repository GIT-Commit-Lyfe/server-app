'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class WatchFunctionModel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      WatchFunctionModel.belongsTo(models.WatchModel, { foreignKey: 'WatchModelId' })
      WatchFunctionModel.belongsTo(models.WatchFunction, { foreignKey: 'WatchFunctionId' })
    }
  };
  WatchFunctionModel.init({
    WatchModelId: DataTypes.NUMBER,
    WatchFunctionId: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'WatchFunctionModel',
  });
  return WatchFunctionModel;
};