'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Crystal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Crystal.hasMany(models.WatchModel, { foreignKey: 'CrystalId' })
    }
  };
  Crystal.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Crystal',
  });
  return Crystal;
};