import _ from "lodash";
import bcrypt from "bcryptjs";
import { Request, Response, NextFunction } from "express";
import { EHttpMethod } from "@enum/index";
import { ILogin, IUser } from "@type/schemas/user.schema";
import StatusCodes from "@constant/statusCode";
import StringValues from "@constant/strings";
import ApiError from "@helper/ApiError";
import Logger from "@helper/logger";
import Validators from "@utils/validator.utils";
import UserService from "@services/user.service";

class UserController {
  private readonly _userSvc: UserService;
  constructor(readonly userSvc: UserService) {
    this._userSvc = userSvc;
  }

  /**
   * @name registerUser
   * @description Perform register user action.
   * @param req IRequest
   * @param res IResponse
   * @param next INext
   * @returns Promise<any>
   */

  public register = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    if (req.method !== EHttpMethod.POST) {
      return next(
        new ApiError(StringValues.INVALID_REQUEST_METHOD, StatusCodes.NOT_FOUND)
      );
    }

    try {
      const { email, name, role, bio, avatar, password }: IUser = req.body;

      if (!name) {
        return next(
          new ApiError(StringValues.NAME_REQUIRED, StatusCodes.BAD_REQUEST)
        );
      }

      if (!email) {
        return next(
          new ApiError(StringValues.EMAIL_REQUIRED, StatusCodes.BAD_REQUEST)
        );
      }

      if (!Validators.validateEmail(email)) {
        return next(
          new ApiError(
            StringValues.INVALID_EMAIL_FORMAT,
            StatusCodes.BAD_REQUEST
          )
        );
      }

      if (!password) {
        return next(
          new ApiError(StringValues.PASSWORD_REQUIRED, StatusCodes.BAD_REQUEST)
        );
      }

      if (password.length < 8) {
        return next(
          new ApiError(
            StringValues.PASSWORD_MIN_LENGTH_ERROR,
            StatusCodes.BAD_REQUEST
          )
        );
      }

      if (password.length > 32) {
        return next(
          new ApiError(
            StringValues.PASSWORD_MAX_LENGTH_ERROR,
            StatusCodes.BAD_REQUEST
          )
        );
      }

      const _email = _.trim(_.toLower(email));

      const isEmailExists = await this._userSvc.checkIsEmailExistsExc(_email);
      if (isEmailExists) {
        res.status(StatusCodes.BAD_REQUEST);
        return res.json({
          success: false,
          message: StringValues.EMAIL_ALREADY_REGISTERED,
          isEmailUsed: true,
        });
      }

      const hashedPassword: string = await bcrypt.hash(password, 10);

      // Create User
      const newUserData: IUser = {
        email: _email,
        name: name.trim(),
        role: role ?? "USER",
        bio: bio ?? "",
        avatar: avatar ?? "",
        password: hashedPassword,
      };

      const newUser = await this._userSvc.createUserExc(newUserData);

      res.status(StatusCodes.CREATED);
      return res.json({
        success: true,
        message: StringValues.SUCCESS,
        data: {
          user: newUser,
        },
      });
    } catch (error: any) {
      const errorMessage =
        error?.message || error || StringValues.SOMETHING_WENT_WRONG;

      Logger.getInstance().error(
        "UserController: register",
        "errorInfo:" + JSON.stringify(error)
      );

      res.status(StatusCodes.BAD_REQUEST);
      return res.json({
        success: false,
        error: errorMessage,
      });
    }
  };

  /**
   * @name login
   * @description Perform login user action.
   * @param req IRequest
   * @param res IResponse
   * @param next INext
   * @returns Promise<any>
   */
  public login = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    if (req.method !== EHttpMethod.POST) {
      return next(
        new ApiError(StringValues.INVALID_REQUEST_METHOD, StatusCodes.NOT_FOUND)
      );
    }
    Logger.getInstance().info("Login Start");
    try {
      const { email, password }: ILogin = req.body;
      if (!email) {
        return next(
          new ApiError(StringValues.EMAIL_REQUIRED, StatusCodes.BAD_REQUEST)
        );
      }

      if (!Validators.validateEmail(email)) {
        return next(
          new ApiError(
            StringValues.INVALID_EMAIL_FORMAT,
            StatusCodes.BAD_REQUEST
          )
        );
      }

      if (!password) {
        return next(
          new ApiError(StringValues.PASSWORD_REQUIRED, StatusCodes.BAD_REQUEST)
        );
      }

      if (password.length < 8) {
        return next(
          new ApiError(
            StringValues.PASSWORD_MIN_LENGTH_ERROR,
            StatusCodes.BAD_REQUEST
          )
        );
      }

      if (password.length > 32) {
        return next(
          new ApiError(
            StringValues.PASSWORD_MAX_LENGTH_ERROR,
            StatusCodes.BAD_REQUEST
          )
        );
      }

      Logger.getInstance().info("Validation End");

      const _email = _.trim(_.toLower(email));

      Logger.getInstance().info("Check Email Exists Start");

      const isEmailExists = await this._userSvc.checkIsEmailExistsExc(_email);
      Logger.getInstance().info("Check Email Exists End");
      if (!isEmailExists) {
        return next(
          new ApiError(
            StringValues.EMAIL_NOT_REGISTERED,
            StatusCodes.BAD_REQUEST
          )
        );
      }

      Logger.getInstance().info("Match Password Start");
      const isPasswordMatched = await this._userSvc.isValidPassword(
        _email,
        password
      );
      Logger.getInstance().info("Match Password End");

      if (!isPasswordMatched) {
        return next(
          new ApiError(StringValues.INCORRECT_PASSWORD, StatusCodes.BAD_REQUEST)
        );
      }

      const resData = await this._userSvc.findUserByEmailExc(_email);
      const token = await this._userSvc.generateToken(resData);

      Logger.getInstance().info("Login End");

      res.status(StatusCodes.OK);
      res.cookie("access-token", token, {
        maxAge: 60 * 60 * 1000,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        path: "/",
      });

      return res.json({
        success: true,
        message: StringValues.SUCCESS,
        data: {
          user: resData,
          token,
        },
      });
    } catch (error: any) {
      const errorMessage =
        error?.message || error || StringValues.SOMETHING_WENT_WRONG;

      Logger.getInstance().error(
        "UserController: login",
        "errorInfo:" + JSON.stringify(error)
      );

      res.status(StatusCodes.BAD_REQUEST);
      return res.json({
        success: false,
        error: errorMessage,
      });
    }
  };
}
export default UserController;
