"use strict";
module.exports = (sequelize, DataTypes) => {
  const Generation = sequelize.define("Generation", {
    position: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
  Generation.associate = models => {
    Generation.belongsTo(models.Family, {
      foreignKey: "familyId",
      onDelete: "CASCADE"
    });
  };
  return Generation;
};
