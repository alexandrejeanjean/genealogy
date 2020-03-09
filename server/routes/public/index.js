const usersController = require("../../controllers").users;

module.exports = app => {
  app.get("/api", (req, res) =>
    res.status(200).send({
      message: "Welcome to the genealogy API!"
    })
  );

  // User routes
  app.post("/api/signup", usersController.create);
  app.post("/api/signin", usersController.signin);
};
