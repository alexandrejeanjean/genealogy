/**
 * @swagger
 * definitions:
 *  Family:
 *   type: object
 *   properties:
 *     id:
 *       type: integer
 *     name:
 *       type: string
 *     userId:
 *        type: string
 *   required:
 *       - name
 *       - userId
 */

export default (sequelize, DataTypes) => {
  const Family = sequelize.define("Family", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  Family.associate = (models) => {
    Family.hasMany(models.Generation, {
      foreignKey: "familyId",
      as: "generations",
    });
    Family.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE",
    });
  };

  return Family;
};
