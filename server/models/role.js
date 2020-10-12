/**
 * @swagger
 * definitions:
 *  Role:
 *   type: object
 *   properties:
 *    id:
 *     type: integer
 *    role:
 *     type: string
 *   required:
 *     - role
 */

export default (sequelize, DataTypes) => {
  const Role = sequelize.define("Role", {
    role: DataTypes.STRING,
  });
  return Role;
};
