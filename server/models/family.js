"use strict";
export default (sequelize, DataTypes) => {
  const Family = sequelize.define("Family", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  Family.associate = function(models) {
    Family.hasMany(models.Generation, {
      foreignKey: "familyId",
      as: "generations"
    });
  };
  return Family;
};
