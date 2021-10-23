'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('BezelMaterials');
    await queryInterface.dropTable('ClaspMaterials');
  },
  down: async (queryInterface, Sequelize) => {
    //
  }
};