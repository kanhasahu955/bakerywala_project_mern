import { Application } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import Logger from "@helper/logger";

class SwaggerDocs {
  private static options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Bakrywala API",
        version: "1.0.0",
        description: "API documentation for the Bakerywala application",
        license: {
          name: "MIT",
          url: "https://spdx.org/licenses/MIT.html",
        },
        contact: {
          name: "Ashok Sahu",
          url: "sahu.com",
          email: "ashoksahu8018183830@gmail.com",
        },
      },
      servers: [{ url: "http://localhost:5000" }],
    },
    // files containing annotations
    apis:
      process.env.NODE_ENV === "production"
        ? [
            "./src/routes/*.js",
            "./src/models/*.js",
            "./src/controllers/**/**.js",
          ]
        : [
            "../routes/*.ts",
            "../schemas/*.ts",
            "../controller/**/**.ts",
          ],
  };

  private static swaggerSpecs = swaggerJsdoc(this.options);

  /**
   * Initialize Swagger Docs
   */

  public static init(_express: Application): Application {
    _express.use(
      "/docs",
      swaggerUi.serve,
      swaggerUi.setup(this.swaggerSpecs, { explorer: true })
    );

    Logger.getInstance().info("Swagger :: Initialized");
    return _express;
  }
}

export default SwaggerDocs;
