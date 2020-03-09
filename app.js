const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const passport = require("passport");

// set up the express app
const app = express();

require("dotenv").config();

// Log requests to console
app.use(logger("dev"));

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Require Passport config
require("./server/config/passport")(passport);

// Require our routes into the application.
require("./server/routes/public")(app);
require("./server/routes/private")(app);

// Setup a default catch-all route that sends back a welcome
app.get("*", (req, res) =>
  res.status(200).send({
    message: "API is ON"
  })
);

module.exports = app;
