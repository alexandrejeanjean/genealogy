const People = require("../models").People;
const getToken = require("../helpers").getToken;

module.exports = {
  create(req, res) {
    var token = getToken(req.headers);
    if (token) {
      return People.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        familyId: req.params.familyId,
        generationId: req.params.generationId
      })
        .then(people => res.status(201).send(people))
        .catch(error => res.status(400).send(error));
    } else {
      return res.status(403).send({ success: false, msg: "Unauthorized." });
    }
  },

  list(req, res) {
    var token = getToken(req.headers);
    if (token) {
      return People.findAll({
        where: {
          familyId: req.params.familyId,
          generationId: req.params.generationId
        }
      })
        .then(peoples => res.status(200).send(peoples))
        .catch(error => res.status(400).send(error));
    } else {
      return res.status(403).send({ success: false, msg: "Unauthorized." });
    }
  },

  destroy(req, res) {
    var token = getToken(req.headers);
    if (token) {
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
    } else {
      return res.status(403).send({ success: false, msg: "Unauthorized." });
    }
  }
};
