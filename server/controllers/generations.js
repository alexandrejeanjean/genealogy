const Generation = require("../models").Generation;
const People = require("../models").People;
const getToken = require("../helpers").getToken;
const ajv = require("../utils/ajv");

const validPostItemParams = ajv.compile(
  require("../schemas/generations/post_generation.json")
);

const validDeleteItemParams = ajv.compile(
  require("../schemas/generations/delete_generation.json")
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
      return Generation.create({
        position: req.body.position,
        familyId: req.params.familyId
      })
        .then(generation => res.status(201).send(generation))
        .catch(error => res.status(400).send(error));
    } else {
      return res.status(403).send({ success: false, msg: "Unauthorized." });
    }
  },

  list(req, res) {
    var token = getToken(req.headers);
    if (token) {
      return Generation.findAll({
        where: {
          familyId: req.params.familyId
        },
        include: [
          {
            model: People,
            as: "peoples"
          }
        ]
      })
        .then(generations => res.status(200).send(generations))
        .catch(error => res.status(400).send(error));
    } else {
      return res.status(403).send({ success: false, msg: "Unauthorized." });
    }
  },

  destroy(req, res) {
    var token = getToken(req.headers);
    if (token) {
      if (!validDeleteItemParams(req.params)) {
        return res.status(400).json({
          message: "Invalid params",
          error: validDeleteItemParams.errors
        });
      }
      return Generation.findOne({
        where: {
          familyId: req.params.familyId,
          id: req.params.generationId
        }
      })
        .then(generation => {
          if (!generation) {
            return res.status(404).send({ message: "Generation not found" });
          }
          return generation
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
