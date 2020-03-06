const Generation = require("../models").Generation;
const People = require("../models").People;

module.exports = {
  create(req, res) {
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
