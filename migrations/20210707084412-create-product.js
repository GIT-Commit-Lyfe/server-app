'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      year: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.INTEGER
      },
      currency: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      topImage: {
        type: Sequelize.STRING
      },
      crownSideImage: {
        type: Sequelize.STRING
      },
      caseBackImage: {
        type: Sequelize.STRING
      },
      showOffImage: {
        type: Sequelize.STRING
      },
      WatchModelId: {
        type: Sequelize.INTEGER
      },
      ConditionId: {
        type: Sequelize.INTEGER
      },
      AccompanyId: {
        type: Sequelize.INTEGER
      },
      BoutiqueId: {
        type: Sequelize.INTEGER
      },
      ProductStatusId: {
        type: Sequelize.INTEGER
      },
      MatchProductId: {
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
    await queryInterface.dropTable('Products');
  }
};