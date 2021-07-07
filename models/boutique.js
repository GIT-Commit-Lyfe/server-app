'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Boutique extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Boutique.hasMany(models.Product, { foreignKey: 'BoutiqueId' })
      Boutique.belongsTo(models.User, { foreignKey: 'UserId' })
    }
  };
  Boutique.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    address: DataTypes.STRING,
    fullAddress: DataTypes.STRING,
    avatar: DataTypes.STRING,
    longitude: DataTypes.INTEGER,
    latitude: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Boutique',
  });
  return Boutique;
};