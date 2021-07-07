'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Accompany extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Accompany.hasMany(models.Product, { foreignKey: 'AccompanyId' })
    }
  };
  Accompany.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Accompany',
  });
  return Accompany;
};