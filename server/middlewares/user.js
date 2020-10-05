const helpers = require("../helpers").getToken;
const User = require("../models").User;

module.exports = {
  // Check authorization token
  checkToken(req, res, next) {
    console.log("request ::", req.headers);
    var token = helpers.getToken(req.headers);
    if (token) {
      next();
    } else {
      res.status(403).send({ success: false, msg: "You are not allowed kid!" });
    }
  },

  checkUsername(req, res, next) {
    User.findOne({
      where: {
        username: req.body.username,
      },
    })
      .then((user) => {
        if (user) {
          return res.status(400).send({
            message: "User already exist.",
          });
        }
        return next();
      })
      .catch((error) => res.status(400).send(error));
  },
};
