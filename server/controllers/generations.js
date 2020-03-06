const Generation = require("../models").Generation;

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
      }
    })
      .then(generations => res.status(200).send(generations))
      .catch(error => res.status(400).send(error));
  }
};
