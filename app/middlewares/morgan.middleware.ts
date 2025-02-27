/**
 * Define Morgan Middleware
 */

import type { Application } from "express";
import morgan from "morgan";
import type { StreamOptions } from "morgan";
import Logger from "@helper/logger";

class Morgan {
  // Override the stream method by telling
  // Morgan to use our custom Logger.getInstance() instead of the console.log.
  private static _stream: StreamOptions = {
    write: (message) => Logger.getInstance().http(message.trim()),
  };

  private static _format: string =
    ":remote-addr :method :url :status :res[content-length] - :response-time ms";

  public static mount(_express: Application): Application {
    Logger.getInstance().info("App :: Registering Morgan middleware...");

    _express.use(morgan(this._format, { stream: this._stream }));

    return _express;
  }
}

export default Morgan;
