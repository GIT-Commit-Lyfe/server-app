'use strict';
const log = require("../utils/log");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Movements", "name").catch(err => {
      log.warn(err.message);
    });
    await queryInterface.addColumn("Movements", "type", {
      allowNull: true,
      type: Sequelize.STRING,
    }).catch(err => {
      log.warn(err.message);
    });
    await queryInterface.addColumn("Movements", "caliberNumber", {
      allowNull: true,
      type: Sequelize.STRING,
    }).catch(err => {
      log.warn(err.message);
    });
    await queryInterface.addColumn("Movements", "numberOfJewel", {
      allowNull: true,
      type: Sequelize.INTEGER,
    }).catch(err => {
      log.warn(err.message);
    });
    await queryInterface.addColumn("Movements", "powerReserved", {
      allowNull: true,
      type: Sequelize.INTEGER,
    }).catch(err => {
      log.warn(err.message);
    });
    await queryInterface.addColumn("Movements", "BrandId", {
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