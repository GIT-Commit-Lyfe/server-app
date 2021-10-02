'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Audit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Collection.belongsTo(models.User, { foreignKey: 'UserId' })
    }
  };
  Audit.init({
    table: DataTypes.STRING,
    data: DataTypes.INTEGER,
    status: DataTypes.STRING, // created | seeded | updated | deleted
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Audit',
  });
  return Audit;
};