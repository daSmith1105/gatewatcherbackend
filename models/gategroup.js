'use strict';
module.exports = (sequelize, DataTypes) => {
  const GateGroup = sequelize.define('GateGroup', {
    sName: {
      allowNull: false,
      type: DataTypes.STRING(30),
      default: ''
    },  
  }, {
    paranoid: true,
    timestamps: true
  });
  GateGroup.associate = (models) => {
    // associations can be defined here
    GateGroup.hasMany(models.GatePerson, {
        foreignKey: 'bGroupID'
      });
  }

  GateGroup.create({ id: 1, sName: 'driver'})
  GateGroup.create({ id: 2, sName: 'passenger'})

  return GateGroup;
};