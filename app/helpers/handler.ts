/**
 * Define the error & exception handlers
 */

import type { Application, Request, Response, NextFunction } from "express";
import EnvConfig from "@config/env.config";
import Logger from "@helper/logger";
import ApiError from "@helper/ApiError";
import StatusCodes from "@constant/statusCode";
import StringValues from "@constant/strings";

class ExceptionHandler {
  /**
   * @name notFoundHandler
   * @description Handles all the not found routes
   * @param _express
   * @returns any
   */
  public static notFoundHandler(_express: Application):any {
    _express.use("*", (req: Request, res: Response): any => {
      const url = req.originalUrl;

      if (url === "/") {
        return res.status(200).json({
          success: true,
          server: "online",
          timestamp: new Date(),
          message: "Server is up and running...",
        });
      }

      const ip =
        req.headers["x-forwarded-for"] ||
        req.headers["x-real-ip"] ||
        req.socket.remoteAddress;

      Logger.getInstance().error(`${ip} Path '${url}' not found!`);

      return res.status(404).json({
        success: false,
        server: "online",
        method: req.method,
        timestamp: new Date(),
        error: "Path not found",
      });
    });

    return _express;
  }

  /**
   * @name clientErrorHandler
   * @description Handles your api/web routes errors/exception
   * @param err any
   * @param req Request
   * @param res Response
   * @param next NextFunction
   * @returns any
   */
  public static clientErrorHandler(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
  ):any {
    Logger.getInstance().error(err.stack);

    if (req.xhr) {
      return res.status(500).send({ error: "Something went wrong!" });
    } else {
      return next(err);
    }
  }

  /**
   * @name errorHandler
   * @description Show undermaintenance page incase of errors
   * @param err any
   * @param req Request
   * @param res Response
   * @param _next NextFunction
   * @returns any
   */
  public static errorHandler(
    err: ApiError,
    req: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _next: NextFunction
  ):any {
    err.statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
    err.message = err.message || StringValues.INTERNAL_SERVER_ERROR;

    const apiPrefix = EnvConfig.getConfig().API_PREFIX;
    console.log(req.originalUrl);

    if (req.originalUrl.includes(`/${apiPrefix}/`)) {
      // Handle Unauthorized Error
      if (err.name && err.name === "UnauthorizedError") {
        const message = StringValues.INVALID_TOKEN;
        err = new ApiError(message, StatusCodes.UNAUTHORIZED);
      }

      // Handle Wrong MongoDB Id error
      if (err.name === "CastError") {
        const message = StringValues.RESOURCE_NOT_FOUND;
        err = new ApiError(message, StatusCodes.NOT_FOUND);
      }

      // Handle Wrong JWT error
      if (err.name === "jsonWebTokenError") {
        const message = StringValues.INVALID_TOKEN;
        err = new ApiError(message, StatusCodes.UNAUTHORIZED);
      }

      // Handle JWT Expire error
      if (err.name === "TokenExpiredError") {
        const message = StringValues.TOKEN_EXPIRED;
        err = new ApiError(message, StatusCodes.UNAUTHORIZED);
      }

      Logger.getInstance().error(err.message);

      return res.status(err.statusCode).json({
        success: false,
        error: err.message,
      });
    }

    return res.render("pages/error", {
      error: err.message,
      title: "Under Maintenance",
    });
  }

  /**
   * @name logErrors
   * @description Register your error/exception monitoring tools right here ie. before "next(err)"!
   * @param err any
   * @param _req Request
   * @param _res Response
   * @param next NextFunction
   * @returns any
   */
  public static logErrors(
    err: any,
    _req: Request,
    _res: Response,
    next: NextFunction
  ) {
    Logger.getInstance().error(err.stack);

    return next(err);
  }
}

export default ExceptionHandler;
