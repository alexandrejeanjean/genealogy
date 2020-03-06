"use strict";
export default (sequelize, DataTypes) => {
  const Person = sequelize.define("Person", {
    firstname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  Person.associate = function(models) {
    Person.belongsTo(models.Generation, {
      foreignKey: "generationId",
      onDelete: "CASCADE"
    });
  };
  return Person;
};
