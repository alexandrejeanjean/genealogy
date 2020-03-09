const People = require("../models").People;
const ajv = require("../utils/ajv");

const validPostItemParams = ajv.compile(
  require("../schemas/peoples/post_people.json")
);

const validDeleteItemParams = ajv.compile(
  require("../schemas/peoples/delete_people.json")
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
    return People.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      familyId: req.params.familyId,
      generationId: req.params.generationId
    })
      .then(people => res.status(201).send(people))
      .catch(error => res.status(400).send(error));
  },

  list(req, res) {
    return People.findAll({
      where: {
        familyId: req.params.familyId,
        generationId: req.params.generationId
      }
    })
      .then(peoples => res.status(200).send(peoples))
      .catch(error => res.status(400).send(error));
  },
  destroy(req, res) {
    // check params
    if (!validDeleteItemParams(req.params)) {
      return res.status(400).json({
        message: "Invalid params",
        error: validDeleteItemParams.errors
      });
    }
    return People.findOne({
      where: {
        familyId: req.params.familyId,
        generationId: req.params.generationId,
        id: req.params.peopleId
      }
    })
      .then(people => {
        if (!people) {
          return res.status(404).send({ message: "People not found" });
        }
        return people
          .destroy()
          .then(() => res.status(204).send())
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  }
};
