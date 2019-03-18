'use strict';
module.exports = (sequelize, DataTypes) => {
  const GateAssignment = sequelize.define('GateAssignment', {  
    }, {
        paranoid: true,
        timestamps: true,
    });
    GateAssignment.associate = (models) => {
    // associations can be defined here
    GateAssignment.belongsTo(models.GateCustomer, {
        foreignKey: 'bCustomerID'
      });
    GateAssignment.belongsTo(models.GateUser, {
    foreignKey: 'bUserID'
    });
    GateAssignment.belongsTo(models.Gate, {
        foreignKey: 'bGateID'
        });
  };
  return GateAssignment;
};