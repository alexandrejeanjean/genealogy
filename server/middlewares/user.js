import model from "../models";
import helpers from "../helpers";

const { User } = model;
const { getToken } = helpers;

export default class UserMiddlewares {
  // Check authorization token
  static checkToken(req, res, next) {
    console.log("request ::", req.headers);
    var token = getToken(req.headers);
    if (token) {
      next();
    } else {
      res.status(403).send({ success: false, msg: "You are not allowed kid!" });
    }
  }

  static checkUsername(req, res, next) {
    User.findOne({
      where: {
        username: req.body.username,
      },
    })
      .then((user) => {
        if (user) {
          return res.status(409).send({
            message: "User already exist.",
          });
        }
        return next();
      })
      .catch((error) => res.status(400).send(error));
  }
}
