import swaggerJsdoc from "swagger-jsdoc";
const options = {
  apis: ["./server/models/*.js", "./server/routes/*.js"],
  basePath: "/api",
  swaggerDefinition: {
    info: {
      description: "Family tree API reference",
      swagger: "2.0",
      title: "Family Tree API",
      version: "1.0.0",
    },
  },
  securityDefinitions: {
    bearerAuth: {
      type: "apiKey",
      name: "Authorization",
      scheme: "bearer",
      bearerFormat: "JWT",
      in: "header",
    },
  },
};

const specs = swaggerJsdoc(options);

export default specs;
