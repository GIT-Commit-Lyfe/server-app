'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UnusedFile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  UnusedFile.init({
    url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'UnusedFile',
  });
  return UnusedFile;
};