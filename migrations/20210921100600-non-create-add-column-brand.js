'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Brands", "site", {
      allowNull: true,
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn("Brands", "description", {
      allowNull: true,
      type: Sequelize.STRING(510),
    });
    await queryInterface.addColumn("Brands", "logoImage", {
      allowNull: true,
      type: Sequelize.STRING,
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Brands", "site");
    await queryInterface.removeColumn("Brands", "description");
    await queryInterface.removeColumn("Brands", "logoImage");
  }
};