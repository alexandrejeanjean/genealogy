import model from "../models";
import ajv from "../utils/ajv";

const { People } = model;

const validPostItemParams = ajv.compile(
  require("../schemas/peoples/post_people.json")
);

const validDeleteItemParams = ajv.compile(
  require("../schemas/peoples/delete_people.json")
);

export default class Peoples {
  static create(req, res) {
    // check params
    if (!validPostItemParams(req.body)) {
      return res.status(400).json({
        message: "Invalid params",
        error: validPostItemParams.errors,
      });
    }

    return People.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      familyId: req.params.familyId,
      generationId: req.params.generationId,
      roleId: req.body.roleId,
    })
      .then((people) => res.status(201).send(people))
      .catch((error) => res.status(400).send(error));
  }

  static list(req, res) {
    return People.findAll({
      where: {
        familyId: req.params.familyId,
        generationId: req.params.generationId,
      },
    })
      .then((peoples) => res.status(200).send(peoples))
      .catch((error) => res.status(400).send(error));
  }

  static destroy(req, res) {
    // check params
    console.log("CHECKING :: ", req.params);
    if (!validDeleteItemParams(req.params)) {
      return res.status(400).json({
        message: "Invalid params",
        error: validDeleteItemParams.errors,
      });
    }

    console.log("ON DELETE");

    return People.findOne({
      where: {
        familyId: req.params.familyId,
        generationId: req.params.generationId,
        id: req.params.peopleId,
      },
    })
      .then((people) => {
        if (!people) {
          return res.status(404).send({ message: "People not found" });
        }
        return people
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  }
}
