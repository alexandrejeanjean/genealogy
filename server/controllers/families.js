const Family = require("../models").Family;
const Generation = require("../models").Generation;

module.exports = {
  create(req, res) {
    return Family.create({
      name: req.body.name
    })
      .then(family => res.status(201).send(family))
      .catch(error => res.status(400).send(error));
  },
  list(req, res) {
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
  }
};
