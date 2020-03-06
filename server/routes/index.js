const familiesController = require("../controllers").families;
const generationsController = require("../controllers").generations;
const peoplesController = require("../controllers").peoples;
const usersController = require("../controllers").users;
const passport = require("passport");

module.exports = app => {
  app.get("/api", (req, res) =>
    res.status(200).send({
      message: "Welcome to the genealogy API!"
    })
  );

  // User routes
  app.post("/api/signup", usersController.create);
  app.post("/api/signin", usersController.signin);

  // Families routes
  app.post(
    "/api/families",
    passport.authenticate("jwt", { session: false }),
    familiesController.create
  );
  app.get(
    "/api/families",
    passport.authenticate("jwt", { session: false }),
    familiesController.list
  );
  app.delete(
    "/api/families/:familyId",
    passport.authenticate("jwt", { session: false }),
    familiesController.destroy
  );

  // Generations routes
  app.post(
    "/api/families/:familyId/generations",
    passport.authenticate("jwt", { session: false }),
    generationsController.create
  );
  app.get(
    "/api/families/:familyId/generations",
    passport.authenticate("jwt", { session: false }),
    generationsController.list
  );
  app.delete(
    "/api/families/:familyId/generations/:generationId",
    passport.authenticate("jwt", { session: false }),
    generationsController.destroy
  );

  // Peoples routes
  app.post(
    "/api/families/:familyId/generations/:generationId/peoples",
    passport.authenticate("jwt", { session: false }),
    peoplesController.create
  );
  app.get(
    "/api/families/:familyId/generations/:generationId/peoples",
    passport.authenticate("jwt", { session: false }),
    peoplesController.list
  );
  app.delete(
    "/api/families/:familyId/generations/:generationId/peoples/:peopleId",
    passport.authenticate("jwt", { session: false }),
    peoplesController.destroy
  );
};
