const usersController = require("../../controllers").users;
const userMiddlewares = require("../../middlewares").user;

module.exports = (app) => {
  app.get("/api", (req, res) =>
    res.status(200).send({
      message: "Welcome to the genealogy API!",
    })
  );

  // User routes
  app.post(
    "/api/signup",
    userMiddlewares.checkUsername,
    usersController.create
  );
  app.post("/api/signin", usersController.signin);
};
