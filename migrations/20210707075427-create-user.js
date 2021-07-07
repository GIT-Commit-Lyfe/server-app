'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING
      },
      middleName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      username: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      googleConnect: {
        type: Sequelize.BOOLEAN
      },
      appleConnect: {
        type: Sequelize.BOOLEAN
      },
      facebookConnect: {
        type: Sequelize.BOOLEAN
      },
      mobile: {
        type: Sequelize.STRING
      },
      picture: {
        type: Sequelize.STRING
      },
      config: {
        type: Sequelize.STRING
      },
      RoleId: {
        type: Sequelize.INTEGER
      },
      SubscriptionId: {
        type: Sequelize.INTEGER
      },
      StatusId: {
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
    await queryInterface.dropTable('Users');
  }
};