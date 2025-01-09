import type { Application } from "express";
import Logger from "@helper/logger";
import AuthRouter from "@route/auth.routes";

class Routes {
  /**
   * @name mountApiRoutes
   * @description Mount all api routes
   * @param _express
   * @returns Application
   */
  public mountApiRoutes(_express: Application): Application {
    const apiPrefix = process.env.API_PREFIX;
    Logger.getInstance().info("Routes :: Mounting API routes...");

    // Mounting Routes
    _express.use(`/${apiPrefix}/auth`, AuthRouter);

    return _express;
  }
}

export default new Routes();
