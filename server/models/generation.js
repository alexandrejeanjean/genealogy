/**
 * @swagger
 * definitions:
 *  Generation:
 *   type: object
 *   properties:
 *     id:
 *       type: integer
 *     position:
 *       type: integer
 *     familyId:
 *        type: string
 *     generationId:
 *        type: string
 *   required:
 *      - position
 *      - familyId
 *      - generationId
 */

export default (sequelize, DataTypes) => {
  const Generation = sequelize.define("Generation", {
    position: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  Generation.associate = (models) => {
    Generation.hasMany(models.People, {
      foreignKey: "generationId",
      as: "peoples",
    });
    Generation.belongsTo(models.Family, {
      foreignKey: "familyId",
      onDelete: "CASCADE",
    });
  };
  return Generation;
};
