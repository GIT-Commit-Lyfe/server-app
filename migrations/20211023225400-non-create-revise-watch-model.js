'use strict';
const log = require("../utils/log");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("WatchModels", "BezelMaterialId").catch(err => {
      log.warn(err.message);
    });
    await queryInterface.removeColumn("WatchModels", "ClaspMaterialId").catch(err => {
      log.warn(err.message);
    });
    await queryInterface.removeColumn("WatchModels", "lugWidth").catch(err => {
      log.warn(err.message);
    });
    await queryInterface.addColumn("WatchModels", "BezelId", {
      allowNull: true,
      type: Sequelize.INTEGER,
    }).catch(err => {
      log.warn(err.message);
    });
    await queryInterface.addColumn("WatchModels", "ticker", {
      allowNull: true,
      type: Sequelize.STRING,
    }).catch(err => {
      log.warn(err.message);
    });
  },
  down: async (queryInterface, Sequelize) => {
    //
  }
};