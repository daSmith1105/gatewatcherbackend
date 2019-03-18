'use strict';
module.exports = (sequelize, DataTypes) => {
  const GateAcl = sequelize.define('GateAcl', {
    sName: {
      allowNull: false,
      type: DataTypes.STRING(20),
      default: ''
    },  
  }, {
    paranoid: true,
    timestamps: true
  });
  GateAcl.associate = (models) => {
    // associations can be defined here
    GateAcl.hasMany(models.GateUser, {
        foreignKey: 'bAuthID'
      });
  }

  GateAcl.create({ id: 1, sName: 'master' })
  GateAcl.create({ id: 2, sName: 'admin' })
  GateAcl.create({ id: 3, sName: 'guard' })
  GateAcl.create({ id: 4, sName: 'client' })
  return GateAcl;
};