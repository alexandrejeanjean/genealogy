const Family = require("../models").Family;
const Generation = require("../models").Generation;
const getToken = require("../helpers").getToken;

module.exports = {
  create(req, res) {
    var token = getToken(req.headers);
    if (token) {
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
