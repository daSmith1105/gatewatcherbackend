'use strict';
module.exports = (sequelize, DataTypes) => {
  const GateLPN = sequelize.define('GateLPN', {
    sLPN: {
      allowNull: false,
      type: DataTypes.STRING(10),
      defaultValue: ''
    },   
    fFlagged: {
      allowNull: false,
      type: DataTypes.TINYINT(1),
      defaultValue: 0
    },
  }, {
    paranoid: true,
    timestamps: true,
  });
  GateLPN.associate = (models) => {
    // associations can be defined here
    GateLPN.belongsTo(models.GateCompany, {
      foreignKey: 'bCompanyID'
    });
    GateLPN.belongsTo(models.GateCustomer, {
      foreignKey: 'bCustomerID'
    });
    GateLPN.hasMany(models.GateEvent, {
      foreignKey: 'bLpnID'
    });
    GateLPN.hasMany(models.GatePerson, {
      foreignKey: 'bLpnID'
    });
  }
  return GateLPN;
};