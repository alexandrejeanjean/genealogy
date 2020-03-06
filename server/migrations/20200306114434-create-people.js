"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("People", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstname: {
        allowNull: false,
        type: Sequelize.STRING
      },
      lastname: { allowNull: false, type: Sequelize.STRING },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      familyId: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        references: {
          model: "Families",
          key: "id",
          as: "familyId"
        }
      },
      generationId: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        references: {
          model: "Generations",
          key: "id",
          as: "generationId"
        }
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("People");
  }
};
