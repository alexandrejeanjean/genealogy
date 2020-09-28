const Role = require("../models").Role;
const ajv = require("../utils/ajv");

const validPostItemParams = ajv.compile(
  require("../schemas/roles/post_role.json")
);

const validDeleteItemParams = ajv.compile(
  require("../schemas/roles/delete_role.json")
);
module.exports = {
  create(req, res) {
    // check params
    if (!validPostItemParams(req.body)) {
      return res.status(400).json({
        message: "Invalid params",
        error: validPostItemParams.errors,
      });
    }
    return Role.create({
      role: req.body.role,
    })
      .then((role) => res.status(201).send(role))
      .catch((error) => res.status(400).send(error));
  },

  list(req, res) {
    return Role.findAll()
      .then((roles) => res.status(200).send(roles))
      .catch((error) => res.status(400).send(error));
  },
};
