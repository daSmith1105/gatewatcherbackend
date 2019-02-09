'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('GateCustomer', {
      sName: {
        allowNull: false,
        type: Sequelize.STRING(1024),
        defaultValue: ''
      },
      sDir: {
        allowNull: false,
        type: Sequelize.STRING(1024),
        defaultValue: ''
      },
      sDomain: {
        allowNull: false,
        type: Sequelize.STRING(65),
        defaultValue: ''
      },
      fPublic: {
        allowNull: false,
        type: Sequelize.TINYINT,
        defaultValue: 0
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('GateCustomer');
  }
};