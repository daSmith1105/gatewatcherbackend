'use strict';
module.exports = (sequelize, DataTypes) => {
  const GateEvent = sequelize.define('GateEvent', {
    sLpnPhoto: {
        allowNull: false,
        type: DataTypes.STRING(1024),
        defaultValue: ''
    },
    sLoadPhoto: {
        allowNull: false,
        type: DataTypes.STRING(1024),
        defaultValue: ''
    },
    sComment: {
      type: DataTypes.TEXT(),
      defaultValue: ''
    },
    aPassengers: {
      type: DataTypes.STRING(), 
    }
  }, {
    paranoid: true,
    timestamps: true
  });
  GateEvent.associate = (models) => {
    // associations can be defined here
    GateEvent.belongsTo(models.GateCustomer, {
      foreignKey: 'bCustomerID'
    });
    GateEvent.belongsTo(models.GateCompany, {
      foreignKey: 'bCompanyID'
    });
    GateEvent.belongsTo(models.Gate, {
      foreignKey: 'bGateID'
    });
    GateEvent.belongsTo(models.GateType, {
      foreignKey: 'bTypeID'
    });
    GateEvent.belongsToMany(models.GatePerson, {
      through: 'EventPeople',
      as: 'people',
    });
    GateEvent.belongsTo(models.GatePerson, {
      foreignKey: 'bPersonID'
    });
    GateEvent.belongsTo(models.GateLPN, {
      foreignKey: 'bLpnID'
    });
    GateEvent.belongsTo(models.GateUser, {
      foreignKey: 'bUserID'
    });
  };
  return GateEvent;
};