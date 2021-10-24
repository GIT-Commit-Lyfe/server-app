'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("WatchModels", "BezelMaterialId");
    await queryInterface.removeColumn("WatchModels", "ClaspMaterialId");
    await queryInterface.addColumn("WatchModels", "BezelId", {
      allowNull: true,
      type: Sequelize.INTEGER,
    });
  },
  down: async (queryInterface, Sequelize) => {
    //
  }
};