const familiesController = require("../controllers").families;
const generationsController = require("../controllers").generations;
const peoplesController = require("../controllers").peoples;
module.exports = app => {
  app.get("/api", (req, res) =>
    res.status(200).send({
      message: "Welcome to the genealogy API!"
    })
  );

  // Families routes
  app.post("/api/families", familiesController.create);
  app.get("/api/families", familiesController.list);
  app.delete("/api/families/:familyId", familiesController.destroy);

  // Generations routes
  app.post("/api/families/:familyId/generations", generationsController.create);
  app.get("/api/families/:familyId/generations", generationsController.list);
  app.delete(
    "/api/families/:familyId/generations/:generationId",
    generationsController.destroy
  );

  // Peoples routes
  app.post(
    "/api/families/:familyId/generations/:generationId/peoples",
    peoplesController.create
  );
  app.get(
    "/api/families/:familyId/generations/:generationId/peoples",
    peoplesController.list
  );
  app.delete(
    "/api/families/:familyId/generations/:generationId/peoples/:peopleId",
    peoplesController.destroy
  );
};
