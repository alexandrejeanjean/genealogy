import "dotenv/config.js";
import express from "express";
import logger from "morgan";
import bodyParser from "body-parser";
import passport from "passport";
import cors from "cors";
import routes from "./server/routes";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger";

// set up the express app
const app = express();

// Log requests to console
app.use(logger("dev"));

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var allowedOrigins = [
  "http://localhost:3000",
  "https://family-tree-app-app.herokuapp.com",
  "http://family-tree-app-app.herokuapp.com",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin
      // (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        var msg =
          "The CORS policy for this site does not " +
          "allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);

// Require Passport config
require("./server/config/passport")(passport);

// Require our routes into the application.
routes(app);

// Swagger JSDoc
app.get("/swagger.json", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});
app.use("/api/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Setup a default catch-all route that sends back a welcome
app.get("*", (req, res) =>
  res.status(200).send({
    message: "API is ON",
  })
);

if (process.env.NODE_ENV === "production") {
  app.listen(parseInt(process.env.PORT, 10) || 3000, () =>
    console.log("Api is ON")
  );
}

module.exports = app;
