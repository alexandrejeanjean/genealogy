"use strict";
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define("Role", {
    role: DataTypes.STRING,
  });
  return Role;
};
