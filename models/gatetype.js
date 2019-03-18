'use strict';
module.exports = (sequelize, DataTypes) => {
  const GateType = sequelize.define('GateType', {
    sName: {
        allowNull: false,
        type: DataTypes.STRING(65),
        default: ''
      },
  }, {
    paranoid: true,
    timestamps: true
  });
  GateType.associate = (models) => {
    // associations can be defined here
    GateType.hasMany(models.GateEvent, {
      foreignKey: 'bTypeID'
    });
  };

  GateType.create({ id: 1, sName: 'IN'})
  GateType.create({ id: 2, sName: 'OUT'})
  GateType.create({ id: 3, sName: 'DENIED'})
  GateType.create({ id: 4, sName: 'ACCIDENT'})

  return GateType;
};