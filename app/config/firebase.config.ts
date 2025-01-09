import type { Application } from "express";
import type { IFirebaseConfig } from "@type/env.interface";
import Logger from "@helper/logger";

class FirebaseConfig {
  // Loading process.env as IFirebaseConfig interface
  public static getConfig(): IFirebaseConfig {
    const config: IFirebaseConfig = {
      FIREBASE_API_KEY: process.env["FIREBASE_API_KEY"],
      FIREBASE_AUTH_DOMAIN: process.env["FIREBASE_AUTH_DOMAIN"],
      FIREBASE_PROJECT_ID: process.env["FIREBASE_PROJECT_ID"],
      FIREBASE_STORAGE_BUCKET: process.env["FIREBASE_STORAGE_BUCKET"],
      FIREBASE_MESSAGING_SENDER_ID: process.env["FIREBASE_MESSAGING_SENDER_ID"],
      FIREBASE_APP_ID: process.env["FIREBASE_APP_ID"],
      FIREBASE_MEASUREMENT_ID: process.env["FIREBASE_MEASUREMENT_ID"],
    };

    for (const [key, value] of Object.entries(config)) {
      if (value === undefined) {
        throw new Error(`Missing key ${key} in Environmental variables`);
      }
    }

    return config as IFirebaseConfig;
  }

  /**
   * Injects your config to the app's locals
   */
  public static init(_express: Application): Application {
    _express.locals["app"] = this.getConfig();

    Logger.getInstance().info("Firebase Config :: Loaded");
    return _express;
  }
}

export default FirebaseConfig;
