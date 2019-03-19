'use strict';
module.exports = (sequelize, DataTypes) => {
  const GatePerson = sequelize.define('GatePerson', {
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
    fFlagged: {
      allowNull: false,
      type: DataTypes.TINYINT(1),
      defaultValue: 0
    },
  }, {
    paranoid: true,
    timestamps: true,
  });
  GatePerson.associate = (models) => {
    // associations can be defined here
    GatePerson.belongsToMany(models.GateEvent, {
      through: 'EventPeople',
      as: 'events'
    });
    GatePerson.hasMany(models.GateEvent, {
      foreignKey: 'bPersonID'
    });
    GatePerson.belongsTo(models.GateGroup, {
      foreignKey: 'bGroupID'
    });
    GatePerson.belongsTo(models.GateCompany, {
      foreignKey: 'bCompanyID'
    });
    GatePerson.belongsTo(models.GateCustomer, {
      foreignKey: 'bCustomerID'
    });
  };
  return GatePerson;
};