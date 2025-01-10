/**
 * Enable basic express apis middleware
 */

import express, { json, urlencoded } from "express";
import type { Application,Request,Response } from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import compression from "compression";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import Logger from "@helper/logger";

class Http {
  public static mount(_express: Application): Application {
    Logger.getInstance().info("App :: Registering HTTP middleware...");
    __dirname = path.resolve();

    _express.use(cors());

    _express.use(cookieParser());

    _express.use(helmet());

    _express.use(compression());

    _express.use(json({ limit: "100mb" }));

    _express.use(urlencoded({ extended: true, limit: "100mb" }));

    _express.use(bodyParser.json({ limit: "100mb" }));

    _express.use(bodyParser.urlencoded({ extended: true, limit: "100mb" }));

    _express.set("trust proxy", true);

    if (process.env.NODE_ENV === "development") {
      _express.use(express.static(path.join(__dirname, "client", "dist")));
      _express.get("*", (_:Request, res:Response):any => {
        res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
      });
    }

    return _express;
  }
}

export default Http;
