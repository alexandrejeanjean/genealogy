/**
 * @swagger
 * definitions:
 *  People:
 *   type: object
 *   properties:
 *     id:
 *       type: integer
 *     firstname:
 *       type: string
 *     lastname:
 *       type: string
 *     roleId:
 *        type: string
 *     familyId:
 *        type: string
 *     generationId:
 *        type: string
 *   required:
 *      - firstname
 *      - lastname
 *      - roleId
 *      - familyId
 *      - generationId
 */
export default (sequelize, DataTypes) => {
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
