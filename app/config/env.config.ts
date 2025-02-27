import type { Application } from "express";
import type { IEnvConfig } from "app/types/env.interface";
import Logger from "@helper/logger";

class EnvConfig {
  // Loading process.env as IEnvConfig interface

  public static getConfig(): IEnvConfig {
    const config = {
      PORT: parseInt(process.env["PORT"] as string, 10) || 4000,
      NODE_ENV: process.env.NODE_ENV,
      SERVER_MAINTENANCE: process.env["SERVER_MAINTENANCE"] === "true",

      MONGO_URI:process.env["PROD_DATABASE_URL"],
        // process.env.NODE_ENV === "development"
        //   ? process.env["LOCAL_DATABASE_URL"]
        //   : process.env["PROD_DATABASE_URL"],
      DB_NAME: process.env["DB_NAME"],

      API_PREFIX: process.env["API_PREFIX"] || "api/v1",

      CORS_ENABLED: process.env["CORS_ENABLED"] === "true",
      LOG_DAYS: process.env["LOG_DAYS"] || 10,

      JWT_SECRET: process.env["JWT_SECRET"],
      JWT_EXPIRES_IN: process.env["JWT_EXPIRES_IN"],

      //   SENDGRID_API_KEY: process.env["SENDGRID_API_KEY"],
      //   SMTP_FROM: process.env["SMTP_FROM"],
    };

    for (const [key, value] of Object.entries(config)) {
      if (value === undefined) {
        throw new Error(`Missing key ${key} in Environmental variables`);
      }
    }

    return config as IEnvConfig;
  }

  /**
   * Injects your config to the app's locals
   */
  public static init(_express: Application): Application {
    _express.locals["app"] = this.getConfig();

    Logger.getInstance().info("Env Config :: Loaded");
    return _express;
  }
}

export default EnvConfig;
