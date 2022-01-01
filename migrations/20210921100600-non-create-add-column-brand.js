'use strict';
const log = require("../utils/log");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Brands", "site", {
      allowNull: true,
      type: Sequelize.STRING,
    }).catch(err => {
      log.warn(err.message);
    });
    await queryInterface.addColumn("Brands", "description", {
      allowNull: true,
      type: Sequelize.STRING(2040),
    }).catch(err => {
      log.warn(err.message);
    });
    await queryInterface.addColumn("Brands", "logoImage", {
      allowNull: true,
      type: Sequelize.STRING,
    }).catch(err => {
      log.warn(err.message);
    });
    await queryInterface.addColumn("Brands", "isWatch", {
      allowNull: true,
      type: Sequelize.BOOLEAN,
    }).catch(err => {
      log.warn(err.message);
    });
    await queryInterface.addColumn("Brands", "isPremium", {
      allowNull: true,
      type: Sequelize.BOOLEAN,
    }).catch(err => {
      log.warn(err.message);
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Brands", "site").catch(err => {
      log.warn(err.message);
    });
    await queryInterface.removeColumn("Brands", "description").catch(err => {
      log.warn(err.message);
    });
    await queryInterface.removeColumn("Brands", "logoImage").catch(err => {
      log.warn(err.message);
    });
    await queryInterface.removeColumn("Brands", "isWatch").catch(err => {
      log.warn(err.message);
    });
    await queryInterface.removeColumn("Brands", "isPremium").catch(err => {
      log.warn(err.message);
    });
  }
};