'use strict';
module.exports = (sequelize, DataTypes) => {
  const GateCompany = sequelize.define('GateCompany', {
    sName: {
      allowNull: false,
      type: DataTypes.STRING(60),
      defaultValue: ''
    },
    sStreet: {
      allowNull: false,
      type: DataTypes.STRING(20),
      defaultValue: ''
    },
    sStreet2: {
        allowNull: false,
        type: DataTypes.STRING(20),
        defaultValue: ''
      },
    sCity: {
      allowNull: false,
      type: DataTypes.STRING(12),
      defaultValue: ''
    },
    sState: {
      allowNull: false,
      type: DataTypes.STRING(16),
      defaultValue: ''
    },
    sCountry: {
      allowNull: false,
      type: DataTypes.STRING(20),
      defaultValue: ''
    },
    sPhone: {
      allowNull: false,
      type: DataTypes.STRING(12),
      defaultValue: ''
    },
    sEmail: {
      allowNull: false,
      type: DataTypes.STRING(65),
      defaultValue: ''
    },
    sContactFirstName: {
      allowNull: false,
      type: DataTypes.STRING(20),
      defaultValue: ''
    },
    sContactLastName: {
        allowNull: false,
        type: DataTypes.STRING(20),
        defaultValue: ''
    },
  }, {});
  
  GateCompany.associate = (models) => {
    // associations can be defined here
    GateCompany.hasMany(models.GateDriver, {
        foreignKey: 'bCompanyID',
        as: 'gatedrivers',
    });
    GateCompany.belongsTo(models.GateCustomer, {
      foreignKey: 'bCustomerID',
      onDelete: 'CASCADE',
    });
  };
  return GateCompany;
};