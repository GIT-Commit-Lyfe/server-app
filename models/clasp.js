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
      Clasp.hasMany(models.WatchModel, { foreignKey: 'ClaspId' })
    }
  };
  Clasp.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Clasp',
  });
  return Clasp;
};