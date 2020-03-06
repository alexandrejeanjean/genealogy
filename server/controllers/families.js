const Family = require("../models").Family;
const Generation = require("../models").Generation;
const getToken = require("../helpers").getToken;
const ajv = require("../utils/ajv");
const validPostItemParams = ajv.compile(
  require("../schemas/families/post_family.json")
);

const validDeleteItemParams = ajv.compile(
  require("../schemas/families/delete_family.json")
);

module.exports = {
  create(req, res) {
    var token = getToken(req.headers);
    if (token) {
      // check params
      if (!validPostItemParams(req.params)) {
        return res.status(400).json({
          message: "Invalid params",
          error: validPostItemParams.errors
        });
      }

      return Family.create({
        name: req.body.name
      })
        .then(family => res.status(201).send(family))
        .catch(error => res.status(400).send(error));
    } else {
      return res.status(403).send({ success: false, msg: "Unauthorized." });
    }
  },
  list(req, res) {
    var token = getToken(req.headers);
    if (token) {
      return Family.findAll({
        include: [
          {
            model: Generation,
            as: "generations"
          }
        ]
      })
        .then(families => res.status(200).send(families))
        .catch(error => res.status(400).send(error));
    } else {
      return res.status(403).send({ success: false, msg: "Unauthorized." });
    }
  },

  destroy(req, res) {
    var token = getToken(req.headers);
    if (token) {
      // check params
      if (!validDeleteItemParams(req.params)) {
        return res.status(400).json({
          message: "Invalid params",
          error: validDeleteItemParams.errors
        });
      }
      return Family.findByPk(req.params.familyId)
        .then(family => {
          if (!family) {
            return res.status(404).send({
              message: "Family not found"
            });
          }

          return family
            .destroy()
            .then(() => res.status(204).send())
            .catch(error => res.status(400).send(error));
        })
        .catch(error => res.status(400).send(error));
    } else {
      return res.status(403).send({ success: false, msg: "Unauthorized." });
    }
  }
};
