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
    fAdmin: {
      allowNull: false,
      type: DataTypes.TINYINT(1),
      defaultValue: 0
    }
  }, {});
  GateUser.associate = (models) => {
    // associations can be defined here
    GateUser.belongsTo(models.GateCustomer, {
      foreignKey: 'bCustomerID',
      onDelete: 'CASCADE',
    });
  };
  return GateUser;
};