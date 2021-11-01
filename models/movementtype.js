'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MovementType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MovementType.hasMany(models.Movement, { foreignKey: 'MovementTypeId' })
    }
  };
  MovementType.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'MovementType',
  });
  return MovementType;
};