const Ajv = require("ajv");

const ajv = new Ajv({
  verbose: false,
  allErrors: true
});

module.exports = ajv;
