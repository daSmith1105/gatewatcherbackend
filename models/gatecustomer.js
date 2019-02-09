'use strict';
module.exports = (sequelize, DataTypes) => {
  const GateCustomer = sequelize.define('GateCustomer', {
    sName: {
      allowNull: false,
      type: DataTypes.STRING(1024),
      defaultValue: ''
    },
    sDir: {
      allowNull: false,
      type: DataTypes.STRING(1024),
      defaultValue: ''
    },
    sDomain: {
      allowNull: false,
      type: DataTypes.STRING(65),
      defaultValue: ''
    },
    fPublic: {
      allowNull: false,
      type: DataTypes.TINYINT,
      defaultValue: 1
    }
  }, {});
  GateCustomer.associate = (models) => {
    // associations can be defined here
    GateCustomer.hasMany(models.GateUser, {
      foreignKey: 'bCustomerID',
      as: 'gateusers',
    });
    GateCustomer.hasMany(models.Gate, {
      foreignKey: 'bCustomerID',
      as: 'gates',
    });
    GateCustomer.hasMany(models.GateCompany, {
      foreignKey: 'bCustomerID',
      as: 'gatecompanies',
    });
  };
  return GateCustomer;
};