const helpers = require("../helpers").getToken;

module.exports = {
  // Check authorization token
  checkToken(req, res, next) {
    var token = helpers.getToken(req.headers);
    if (token) {
      next();
    } else {
      res.status(403).send({ success: false, msg: "You are not allowed kid!" });
    }
  }
};
