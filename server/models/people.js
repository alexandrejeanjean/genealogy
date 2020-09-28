"use strict";
module.exports = (sequelize, DataTypes) => {
  const People = sequelize.define("People", {
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: { type: DataTypes.STRING, allowNull: false },
    roleId: { type: DataTypes.INTEGER, allowNull: false },
  });
  People.associate = function (models) {
    People.belongsTo(models.Family, {
      foreignKey: "familyId",
    });
    People.belongsTo(models.Generation, {
      foreignKey: "generationId",
      onDelete: "CASCADE",
    });
  };
  return People;
};
