'use strict';
module.exports = (sequelize, DataTypes) => {
  const GateUser = sequelize.define('GateUser', {
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
    sUsername: {
      allowNull: false,
      type: DataTypes.STRING(60),
      defaultValue: ''
    },
    sPassword: {
      allowNull: false,
      type: DataTypes.STRING(65),
      defaultValue: ''
    },
  }, {
    paranoid: true,
    timestamps: true,
  });
  GateUser.associate = (models) => {
    // associations can be defined here
    GateUser.belongsTo(models.GateCustomer, {
      foreignKey: 'bCustomerID'
    });
    GateUser.belongsTo(models.GateAcl, {
      foreignKey: 'bAuthID'
    });
    GateUser.hasMany(models.GateEvent, {
      foreignKey: 'bUserID'
    });
    GateUser.hasOne(models.GateAssignment, {
      foreignKey: 'bUserID',
    });
  };

  GateUser.create({ id: 1, bAuthID: 1, bCustomerID: 1, sFirstName: 'Dividia', sLastName: 'Technologies', sUsername: 'dividia', sPassword: 'rda2245' })
  GateUser.create({ id: 2, bAuthID: 1, bCustomerID: 1, sFirstName: 'Master', sLastName: 'Admin', sUsername: 'master', sPassword: 'master' })

  return GateUser;
};