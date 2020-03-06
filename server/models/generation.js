"use strict";
export default (sequelize, DataTypes) => {
  const Generation = sequelize.define("Generation", {
    position: {
      type: DataTypes.NUMBER,
      allowNull: false
    }
  });
  Generation.associate = function(models) {
    Generation.hasMany(models.person, {
      foreignKey: "generationId",
      as: "persons"
    });
    Generation.belongsTo(models.Family, {
      foreignKey: "familyId",
      onDelete: "CASCADE"
    });
  };
  return Generation;
};
