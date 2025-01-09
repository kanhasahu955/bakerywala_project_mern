import mongoose from "mongoose";
import EnvConfig from "@config/env.config";
import Logger from "@helper/logger";

class MongoDB {
  private static instance: MongoDB;
  private constructor() {}

  public static getInstance(): MongoDB {
    if (!MongoDB.instance) {
      MongoDB.instance = new MongoDB();
    }
    return MongoDB.instance;
  }

  public async connect(): Promise<boolean> {
    try {
      await mongoose.connect(EnvConfig.getConfig().MONGO_URI!, {
        dbName: EnvConfig.getConfig().DB_NAME,
        autoIndex: true,
        socketTimeoutMS: 30000,
        serverSelectionTimeoutMS: 5000,
      });
      Logger.getInstance().info("Database :: Connected @ MongoDB");
      return true;
    } catch (error: any) {
      Logger.getInstance().error(`Database :: Error: ${error.message}`);
      return false;
    }
  }
}
export { MongoDB };
