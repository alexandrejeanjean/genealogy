import model from "../models";

const { Role } = model;

export default class RoleMiddlewares {
  static checkExistingRole(req, res, next) {
    Role.findOne({
      where: {
        role: req.body.role,
      },
    })
      .then((role) => {
        if (role) {
          return res.status(409).send({
            message: "Role already exist.",
          });
        }
        return next();
      })
      .catch((error) => res.status(400).send(error));
  }
}
