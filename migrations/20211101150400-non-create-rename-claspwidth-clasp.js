'use strict';
const log = require("../utils/log");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Clasps", "width").catch(err => {
      log.warn(err.message);
    });
    await queryInterface.addColumn("Clasps", "claspWidth", {
      allowNull: true,
      type: Sequelize.INTEGER,
    }).catch(err => {
      log.warn(err.message);
    });
  },
  down: async (queryInterface, Sequelize) => {
    //
  }
};