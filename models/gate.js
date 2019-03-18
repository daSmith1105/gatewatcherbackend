'use strict';
module.exports = (sequelize, DataTypes) => {
  const Gate = sequelize.define('Gate', {
    sName: {
      allowNull: false,
      type: DataTypes.STRING(60),
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
    },
  }, {
    paranoid: true,
    timestamps: true
  });
  Gate.associate = (models) => {
    // associations can be defined here
    Gate.belongsTo(models.GateCustomer, {
      foreignKey: 'bCustomerID'
    });
    Gate.hasMany(models.GateEvent, {
      foreignKey: 'bGateID'
    });
    Gate.hasMany(models.GateAssignment, {
      foreignKey: 'bGateID'
    });
    
  };
  return Gate;
};