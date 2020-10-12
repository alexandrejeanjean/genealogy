import model from "../models";
import jwt from "jsonwebtoken";
import ajv from "../utils/ajv";

const { User } = model;

const validPostItemParams = ajv.compile(
  require("../schemas/users/post_user.json")
);

export default class Users {
  static create(req, res) {
    // check params
    if (!validPostItemParams(req.body)) {
      return res.status(400).json({
        message: "Invalid params",
        error: validPostItemParams.errors,
      });
    } else {
      User.create({
        username: req.body.username,
        password: req.body.password,
      })
        .then((user) => res.status(201).send(user))
        .catch((error) => {
          console.log(error);
          res.status(400).send(error);
        });
    }
  }

  /* Get user information */
  static getMe(req, res) {
    User.findByPk(req.user.dataValues.id)
      .then((user) => {
        if (!user) {
          return res.status(400).send({
            message: "User not found.",
          });
        }
        return res.status(201).send({ id: user.id, username: user.username });
      })
      .catch((error) => res.status(400).send(error));
  }

  static signin(req, res) {
    User.findOne({
      where: {
        username: req.body.username,
      },
    })
      .then((user) => {
        if (!user) {
          return res.status(401).send({
            message: "Authentication failed. User not found.",
          });
        }
        user.comparePassword(req.body.password, (err, isMatch) => {
          if (isMatch && !err) {
            var token = jwt.sign(
              JSON.parse(JSON.stringify(user)),
              "nodeauthsecret",
              { expiresIn: 86400 * 30 }
            );
            jwt.verify(token, "nodeauthsecret", function (err, data) {
              console.log(err, data);
            });
            res.json({ success: true, token: "JWT " + token });
          } else {
            res.status(403).send({
              success: false,
              msg: "Authentication failed. Wrong password.",
            });
          }
        });
      })
      .catch((error) => res.status(400).send(error));
  }
}
