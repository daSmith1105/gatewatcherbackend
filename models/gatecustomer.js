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
      type: DataTypes.TINYINT(1),
      defaultValue: 1
    },
  }, {
    paranoid: true,
    timestamps: true,
  });
  GateCustomer.associate = (models) => {
    // associations can be defined here
    GateCustomer.hasMany(models.GateEvent, {
      foreignKey: 'bCustomerID'
    });
    GateCustomer.hasMany(models.GateCompany, {
      foreignKey: 'bCustomerID'
    });
    GateCustomer.hasMany(models.Gate, {
      foreignKey: 'bCustomerID'
    });
    GateCustomer.hasMany(models.GateLPN, {
      foreignKey: 'bCustomerID'
    });
    GateCustomer.hasMany(models.GateUser, {
      foreignKey: 'bCustomerID'
    });
    GateCustomer.hasMany(models.GateAssignment, {
      foreignKey: 'bCustomerID'
    });
    GateCustomer.hasMany(models.GatePerson, {
      foreignKey: 'bCustomerID'
    });
  };

  GateCustomer.create({ id: 1, sName: 'Test', sDir:'test', sDomain: 'test', fPublic: 0 })

  return GateCustomer;
};