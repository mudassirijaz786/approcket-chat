const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const config = require("config");

module.exports = (app) => {
  // Extended: https://swagger.io/specification/#infoObject
  const swaggerOptions = {
    swaggerDefinition: {
      info: {
        version: "1.0.0",
        title: "ELYS API",
        description: "ELYS API docs",
        contact: {
          name: "Sabir and co developers",
        },
        servers: [`http://localhost:${config.get("port")}`],
      },
    },
    apis: ["./routes/*.js", "./apis-docs/*.yaml"],
  };
  const swaggerDocs = swaggerJsDoc(swaggerOptions);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};
