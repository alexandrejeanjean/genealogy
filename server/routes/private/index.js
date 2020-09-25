const familiesController = require('../../controllers').families
const generationsController = require('../../controllers').generations
const peoplesController = require('../../controllers').peoples
const usersController = require('../../controllers').users
const userMiddlewares = require('../../middlewares').user
const passport = require('passport')

module.exports = (app) => {
  app.get('/api', (req, res) =>
    res.status(200).send({
      message: 'Welcome to the genealogy API!',
    })
  )

  // User infos routes
  app.get(
    '/api/me',
    userMiddlewares.checkToken,
    passport.authenticate('jwt', { session: false }),
    usersController.getMe
  )

  // Families routes
  app.post(
    '/api/families',
    userMiddlewares.checkToken,
    passport.authenticate('jwt', { session: false }),
    familiesController.create
  )
  app.get(
    '/api/families',
    userMiddlewares.checkToken,
    passport.authenticate('jwt', { session: false }),
    familiesController.list
  )
  app.delete(
    '/api/families/:familyId',
    passport.authenticate('jwt', { session: false }),
    userMiddlewares.checkToken,
    familiesController.destroy
  )

  // Generations routes
  app.post(
    '/api/families/:familyId/generations',
    userMiddlewares.checkToken,
    passport.authenticate('jwt', { session: false }),
    generationsController.create
  )
  app.get(
    '/api/families/:familyId/generations',
    userMiddlewares.checkToken,
    passport.authenticate('jwt', { session: false }),
    generationsController.list
  )
  app.delete(
    '/api/families/:familyId/generations/:generationId',
    userMiddlewares.checkToken,
    passport.authenticate('jwt', { session: false }),
    generationsController.destroy
  )

  // Peoples routes
  app.post(
    '/api/families/:familyId/generations/:generationId/peoples',
    userMiddlewares.checkToken,
    passport.authenticate('jwt', { session: false }),

    peoplesController.create
  )
  app.get(
    '/api/families/:familyId/generations/:generationId/peoples',
    userMiddlewares.checkToken,
    passport.authenticate('jwt', { session: false }),
    peoplesController.list
  )
  app.delete(
    '/api/families/:familyId/generations/:generationId/peoples/:peopleId',
    userMiddlewares.checkToken,
    passport.authenticate('jwt', { session: false }),
    peoplesController.destroy
  )
}
