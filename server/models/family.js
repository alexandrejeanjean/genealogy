"use strict";
module.exports = (sequelize, DataTypes) => {
  const Family = sequelize.define("Family", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  Family.associate = models => {
    Family.hasMany(models.Generation, {
      foreignKey: "familyId",
      as: "generations"
    });
  };
  return Family;
};
