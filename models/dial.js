'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Dial extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Dial.belongsTo(models.Brand, { foreignKey: 'BrandId' })
      Dial.hasMany(models.WatchModel, { foreignKey: 'DialId' })
    }
  };
  Dial.init({
    name: DataTypes.STRING,
    partNumber: DataTypes.STRING,
    color: DataTypes.STRING,
    dialStyle: DataTypes.STRING,
    indexMaterial: DataTypes.STRING,
    BrandId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Dial',
  });
  return Dial;
};