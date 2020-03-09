const Generation = require("../models").Generation;
const People = require("../models").People;
const ajv = require("../utils/ajv");

const validPostItemParams = ajv.compile(
  require("../schemas/generations/post_generation.json")
);

const validDeleteItemParams = ajv.compile(
  require("../schemas/generations/delete_generation.json")
);

module.exports = {
  create(req, res) {
    // check params
    if (!validPostItemParams(req.body)) {
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
  },
  list(req, res) {
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
  },

  destroy(req, res) {
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
  }
};
