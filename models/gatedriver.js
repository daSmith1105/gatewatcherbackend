'use strict';
module.exports = (sequelize, DataTypes) => {
  const GateDriver = sequelize.define('GateDriver', {
    sFirstName: {
      allowNull: false,
      type: DataTypes.STRING(20),
      defaultValue: ''
    },
    sLastName: {
      allowNull: false,
      type: DataTypes.STRING(20),
      defaultValue: ''
    },
  }, {});
  GateDriver.associate = (models) => {
    // associations can be defined here
    GateDriver.hasMany(models.GateLPN, {
        foreignKey: 'bDriverID',
        as: 'gatelpns',
    });
    GateDriver.belongsTo(models.GateCompany, {
      foreignKey: 'bCompanyID',
      onDelete: 'CASCADE',
    });
  };
  return GateDriver;
};