import { Request, Response, NextFunction } from "express";
import { EHttpMethod } from "@enum/index";
import StatusCodes from "@constant/statusCode";
import StringValues from "@constant/strings";
import ApiError from "@helper/ApiError";

class UserService {
  // Create an `User`
  public createUserExc = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    if (req.method !== EHttpMethod.GET) {
      return next(
        new ApiError(StringValues.INVALID_REQUEST_METHOD, StatusCodes.NOT_FOUND)
      );
    }
    return res.status(StatusCodes.OK).json({
      message: StringValues.DONE,
    });
  };
}

export default UserService;
