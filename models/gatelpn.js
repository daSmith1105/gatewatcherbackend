'use strict';
module.exports = (sequelize, DataTypes) => {
  const GateLPN = sequelize.define('GateLPN', {
    sLPN: {
      allowNull: false,
      type: DataTypes.STRING(10),
      defaultValue: ''
    },
  }, {});
  GateLPN.associate = (models) => {
    // associations can be defined here
    GateLPN.belongsTo(models.GateDriver, {
      foreignKey: 'bDriverID',
      onDelete: 'CASCADE',
    });
  };
  return GateLPN;
};