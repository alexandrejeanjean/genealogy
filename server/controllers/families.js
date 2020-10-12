import model from "../models";
import ajv from "../utils/ajv";

const { Family, Generation } = model;

const validPostItemParams = ajv.compile(
  require("../schemas/families/post_family.json")
);

const validDeleteItemParams = ajv.compile(
  require("../schemas/families/delete_family.json")
);

export default class Families {
  static create(req, res) {
    // check params
    if (!validPostItemParams(req.body)) {
      return res.status(400).json({
        message: "Invalid params",
        error: validPostItemParams.errors,
      });
    }

    return Family.create({
      name: req.body.name,
      userId: req.user.dataValues.id,
    })
      .then((family) => res.status(201).send(family))
      .catch((error) => res.status(400).send(error));
  }

  static list(req, res) {
    return Family.findAll({
      where: {
        userId: req.user.dataValues.id,
      },
      include: [
        {
          model: Generation,
          as: "generations",
        },
      ],
    })
      .then((families) => res.status(200).send(families))
      .catch((error) => res.status(400).send(error));
  }

  static destroy(req, res) {
    // check params
    if (!validDeleteItemParams(req.params)) {
      return res.status(400).json({
        message: "Invalid params",
        error: validDeleteItemParams.errors,
      });
    }
    return Family.findByPk(req.params.familyId)
      .then((family) => {
        if (!family) {
          return res.status(404).send({
            message: "Family not found",
          });
        }

        return family
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  }
}
