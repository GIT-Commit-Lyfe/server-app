'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Clasps", "material", {
      allowNull: true,
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn("Clasps", "partNumber", {
      allowNull: true,
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn("Clasps", "color", {
      allowNull: true,
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn("Clasps", "width", {
      allowNull: true,
      type: Sequelize.INTEGER,
    });
    await queryInterface.addColumn("Clasps", "BrandId", {
      allowNull: true,
      type: Sequelize.INTEGER,
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Clasps", "material");
    await queryInterface.removeColumn("Clasps", "partNumber");
    await queryInterface.removeColumn("Clasps", "color");
    await queryInterface.removeColumn("Clasps", "width");
    await queryInterface.removeColumn("Clasps", "BrandId");
  }
};