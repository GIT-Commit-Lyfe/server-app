'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Collection extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Collection.belongsTo(models.Brand, { foreignKey: 'BrandId' })
      Collection.hasMany(models.WatchModel, { foreignKey: 'CollectionId' })
    }
  };
  Collection.init({
    name: DataTypes.STRING,
    BrandId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Collection',
  });
  return Collection;
};