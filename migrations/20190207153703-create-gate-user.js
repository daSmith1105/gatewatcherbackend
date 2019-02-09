'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('GateUser', {
      sFirstName: {
        allowNull: false,
        type: Sequelize.STRING(20),
        defaultValue: ''
      },
      sLastName: {
        allowNull: false,
        type: Sequelize.STRING(20),
        defaultValue: ''
      },
      sPhone: {
        allowNull: false,
        type: Sequelize.STRING(12),
        defaultValue: ''
      },
      sEmail: {
        allowNull: false,
        type: Sequelize.STRING(65),
        defaultValue: ''
      },
      sUsername: {
        allowNull: false,
        type: Sequelize.STRING(60),
        defaultValue: ''
      },
      sPassword: {
        allowNull: false,
        type: Sequelize.STRING(65),
        defaultValue: ''
      },
      bCustomerID: {
        allowNull: false,
        type: Sequelize.BIGINT(20),
        onDelete: 'CASCADE',
        references: {
          model: 'GateCustomer',
          key: 'id',
          as: 'bCustomerID'
        },
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
    return queryInterface.dropTable('GateUser');
  }
};