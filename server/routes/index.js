import rolesController from "../controllers/roles";
import peoplesController from "../controllers/peoples";
import generationsController from "../controllers/generations";
import familiesController from "../controllers/families";
import usersController from "../controllers/users";
import userMiddlewares from "../middlewares/user";
import roleMiddlewares from "../middlewares/role";

import passport from "passport";

export default (app) => {
  // ================================= Public routes =======================================
  app.get("/api", (req, res) =>
    res.status(200).send({
      message: "Welcome to the Family tree API!",
    })
  );

  // User routes --------------------------------------------
  app.post(
    "/api/signup",
    userMiddlewares.checkUsername,
    usersController.create
  );

  app.post("/api/signin", usersController.signin);

  app.get("/api", (req, res) =>
    res.status(200).send({
      message: "Welcome to the genealogy API!",
    })
  );

  // ================================= Privates routes =======================================
  // User infos routes --------------------------------------
  app.get(
    "/api/me",
    passport.authenticate("jwt", { session: false }),
    usersController.getMe
  );

  // People roles routes -------------------------------------
  app.post(
    "/api/roles",
    passport.authenticate("jwt", { session: false }),
    roleMiddlewares.checkExistingRole,
    rolesController.create
  );

  app.get(
    "/api/roles",
    passport.authenticate("jwt", { session: false }),
    rolesController.list
  );

  // Families routes ------------------------------------------
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

  // Generations routes ----------------------------------------
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

  // Peoples routes -----------------------------------------------
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
