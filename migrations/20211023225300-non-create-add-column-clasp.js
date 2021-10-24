'use strict';
const log = require("../utils/log");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Clasps", "material", {
      allowNull: true,
      type: Sequelize.STRING,
    }).catch(err => {
      log.warn(err.message);
    });
    await queryInterface.addColumn("Clasps", "partNumber", {
      allowNull: true,
      type: Sequelize.STRING,
    }).catch(err => {
      log.warn(err.message);
    });
    await queryInterface.addColumn("Clasps", "color", {
      allowNull: true,
      type: Sequelize.STRING,
    }).catch(err => {
      log.warn(err.message);
    });
    await queryInterface.addColumn("Clasps", "width", {
      allowNull: true,
      type: Sequelize.INTEGER,
    }).catch(err => {
      log.warn(err.message);
    });
    await queryInterface.addColumn("Clasps", "BrandId", {
      allowNull: true,
      type: Sequelize.INTEGER,
    }).catch(err => {
      log.warn(err.message);
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Clasps", "material").catch(err => {
      log.warn(err.message);
    });
    await queryInterface.removeColumn("Clasps", "partNumber").catch(err => {
      log.warn(err.message);
    });
    await queryInterface.removeColumn("Clasps", "color").catch(err => {
      log.warn(err.message);
    });
    await queryInterface.removeColumn("Clasps", "width").catch(err => {
      log.warn(err.message);
    });
    await queryInterface.removeColumn("Clasps", "BrandId").catch(err => {
      log.warn(err.message);
    });
  }
};