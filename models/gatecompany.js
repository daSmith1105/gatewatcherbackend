'use strict';
module.exports = (sequelize, DataTypes) => {
  const GateCompany = sequelize.define('GateCompany', {
    sName: {
      allowNull: false,
      type: DataTypes.STRING(100),
      defaultValue: ''
    },
    fFlagged: {
      allowNull: false,
      type: DataTypes.TINYINT(1),
      defaultValue: 0
    },
  }, {
    paranoid: true,
    timestamps: true
  });
  GateCompany.associate = (models) => {
    // associations can be defined here 
    GateCompany.belongsTo(models.GateCustomer, {
      foreignKey: 'bCustomerID'
    });
    GateCompany.hasMany(models.GateEvent, {
      foreignKey: 'bCompanyID'
    });
    GateCompany.hasMany(models.GatePerson, {
      foreignKey: 'bCompanyID'
    });
    GateCompany.hasMany(models.GateLPN, {
      foreignKey: 'bCompanyID'
    });
  };
  return GateCompany;
};