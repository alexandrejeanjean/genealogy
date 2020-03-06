const familiesController = require("../controllers").families;
const generationsController = require("../controllers").generations;

module.exports = app => {
  app.get("/api", (req, res) =>
    res.status(200).send({
      message: "Welcome to the genealogy API!"
    })
  );

  app.post("/api/families", familiesController.create);
  app.get("/api/families", familiesController.list);

  app.post("/api/families/:familyId/generations", generationsController.create);
  app.get("/api/families/:familyId/generations", generationsController.list);
};
