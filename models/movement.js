'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Movement.belongsTo(models.Brand, { foreignKey: 'MovementTypeId' })
      Movement.belongsTo(models.Brand, { foreignKey: 'BrandId' })
      Movement.hasMany(models.WatchModel, { foreignKey: 'MovementId' })
    }
  };
  Movement.init({
    caliberNumber: DataTypes.STRING,
    numberOfJewel: DataTypes.INTEGER,
    powerReserved: DataTypes.INTEGER,
    BrandId: DataTypes.INTEGER,
    MovementTypeId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Movement',
  });
  return Movement;
};