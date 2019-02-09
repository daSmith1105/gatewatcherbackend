'use strict';
module.exports = (sequelize, DataTypes) => {
  const Gate = sequelize.define('Gate', {
    sName: {
      allowNull: false,
      type: DataTypes.STRING(20),
      defaultValue: ''
    },
    sDir: {
        allowNull: false,
        type: DataTypes.STRING(1024),
        defaultValue: ''
      },
    fReportErrors: {
      allowNull: false,
      type: DataTypes.TINYINT(1),
      defaultValue: 1
    }
  }, {});
  Gate.associate = (models) => {
    // associations can be defined here
    Gate.belongsTo(models.GateCustomer, {
      foreignKey: 'bCustomerID',
      onDelete: 'CASCADE',
    });
  };
  return Gate;
};