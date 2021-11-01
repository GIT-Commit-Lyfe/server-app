'use strict';
const log = require("../utils/log");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Bracelets", "claspWidth", {
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