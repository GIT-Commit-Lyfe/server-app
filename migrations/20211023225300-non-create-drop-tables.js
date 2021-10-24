'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('BezelMaterials');
    await queryInterface.dropTable('ClaspMaterials');
    await queryInterface.dropTable('BraceletMaterials');
    await queryInterface.dropTable('BraceletColors');
  },
  down: async (queryInterface, Sequelize) => {
    //
  }
};