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
    // await queryInterface.removeColumn("WatchModels", "lugWidth").catch(err => {
    //   log.warn(err.message);
    // }); // CANCEL TO REMOVE
    await queryInterface.removeColumn("WatchModels", "BraceletMaterialId").catch(err => {
      log.warn(err.message);
    });
    await queryInterface.removeColumn("WatchModels", "BraceletColorId").catch(err => {
      log.warn(err.message);
    });
    await queryInterface.removeColumn("WatchModels", "DialMaterialId").catch(err => {
      log.warn(err.message);
    });
    await queryInterface.removeColumn("WatchModels", "glass").catch(err => {
      log.warn(err.message);
    });
    // await queryInterface.removeColumn("WatchModels", "streetName").catch(err => {
    //   log.warn(err.message);
    // }); // CANCEL TO REMOVE
    await queryInterface.removeColumn("WatchModels", "numberOfJewel").catch(err => {
      log.warn(err.message);
    });
    await queryInterface.removeColumn("WatchModels", "powerReserved").catch(err => {
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
    await queryInterface.addColumn("WatchModels", "BraceletId", {
      allowNull: true,
      type: Sequelize.INTEGER,
    }).catch(err => {
      log.warn(err.message);
    });
    await queryInterface.addColumn("WatchModels", "DialId", {
      allowNull: true,
      type: Sequelize.INTEGER,
    }).catch(err => {
      log.warn(err.message);
    });
    // await queryInterface.addColumn("WatchModels", "crystal", {
    //   allowNull: true,
    //   type: Sequelize.STRING,
    // }).catch(err => {
    //   log.warn(err.message);
    // }); CANCEL TO ADD, CHANGED TO CrystalId
    await queryInterface.addColumn("WatchModels", "significantEdition", {
      allowNull: true,
      type: Sequelize.STRING,
    }).catch(err => {
      log.warn(err.message);
    });
    await queryInterface.addColumn("WatchModels", "streetName", {
      allowNull: true,
      type: Sequelize.STRING,
    }).catch(err => {
      log.warn(err.message);
    });
    await queryInterface.addColumn("WatchModels", "configuration", {
      allowNull: true,
      type: Sequelize.STRING,
    }).catch(err => {
      log.warn(err.message);
    });

    await queryInterface.removeColumn("WatchModels", "crystal").catch(err => {
      log.warn(err.message);
    });
    await queryInterface.removeColumn("WatchModels", "dialNumeral").catch(err => {
      log.warn(err.message);
    });
    await queryInterface.removeColumn("WatchModels", "WatchFunctionId").catch(err => {
      log.warn(err.message);
    });

    await queryInterface.addColumn("WatchModels", "discontinuedAt", {
      allowNull: true,
      type: Sequelize.STRING,
    }).catch(err => {
      log.warn(err.message);
    });
    await queryInterface.addColumn("WatchModels", "lugWidth", {
      allowNull: true,
      type: Sequelize.INTEGER,
    }).catch(err => {
      log.warn(err.message);
    });
    await queryInterface.addColumn("WatchModels", "CrystalId", {
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