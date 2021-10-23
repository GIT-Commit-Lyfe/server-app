'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('WatchModels', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      referenceNumber: {
        type: Sequelize.STRING
      },
      modelImage: {
        type: Sequelize.STRING
      },
      caseMaterial: {
        type: Sequelize.STRING
      },
      caseDiameter: {
        type: Sequelize.INTEGER
      },
      caseThickness: {
        type: Sequelize.INTEGER
      },
      waterResistance: {
        type: Sequelize.INTEGER
      },
      glass: {
        type: Sequelize.STRING
      },
      streetName: {
        type: Sequelize.STRING
      },
      lugWidth: {
        type: Sequelize.STRING
      },
      introducedAt: {
        type: Sequelize.STRING
      },
      powerReserved: {
        type: Sequelize.INTEGER
      },
      numberOfJewel: {
        type: Sequelize.INTEGER
      },
      dialNumeral: {
        type: Sequelize.STRING
      },
      otherInfo: {
        type: Sequelize.STRING
      },
      CollectionId: {
        type: Sequelize.INTEGER
      },
      CaliberId: {
        type: Sequelize.INTEGER
      },
      MovementId: {
        type: Sequelize.INTEGER
      },
      BezelId: {
        type: Sequelize.INTEGER
      },
      DialMaterialId: {
        type: Sequelize.INTEGER
      },
      BraceletMaterialId: {
        type: Sequelize.INTEGER
      },
      BraceletColorId: {
        type: Sequelize.INTEGER
      },
      ClaspId: {
        type: Sequelize.INTEGER
      },
      ClaspMaterialId: {
        type: Sequelize.INTEGER
      },
      WatchFunctionId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('WatchModels');
  }
};