import _ from "lodash";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Logger from "@helper/logger";
import { PrismaClient } from "@prisma/client";
import { IUser } from "@type/schemas/user.schema";
import EnvConfig from "@config/env.config";

const prisma = new PrismaClient();

class UserService {
  // Create an `User`
  public createUserExc = async (_user: IUser): Promise<any> => {
    try {
      // Create a new `User`
      const newUser = await prisma.user.create({
        data: {
          ..._user,
        },
      });
      return Promise.resolve(newUser);
    } catch (error) {
      console.log(error);
      Logger.getInstance().error(
        "UserService: createUserExc",
        "errorInfo:" + JSON.stringify(error)
      );
      return Promise.reject(error);
    }
  };

  // Check if `User` already registered with the email
  public checkIsEmailExistsExc = async (_email: string): Promise<boolean> => {
    try {
      const exist_user = await prisma.user.findUnique({
        where: { email: _email },
      });

      if (!exist_user) {
        return Promise.resolve(false);
      }

      return Promise.resolve(true);
    } catch (error) {
      Logger.getInstance().error(
        "UserService: checkIsEmailExistsExc",
        "errorInfo:" + JSON.stringify(error)
      );
      return Promise.reject(error);
    }
  };

  // Find an `User` by an email
  public findUserByEmailExc = async (_email: string): Promise<any> => {
    try {
      const user = await prisma.user.findUnique({ where: { email: _email } });

      return Promise.resolve(user);
    } catch (error) {
      Logger.getInstance().error(
        "UserService: findUserByEmailExc",
        "errorInfo:" + JSON.stringify(error)
      );
      return Promise.reject(error);
    }
  };

  public isValidPassword = async (
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });
      let isValidPassword: boolean = false;

      if (!_.isNull(user?.password)) {
        isValidPassword = await bcrypt.compare(password, user.password);
      }
      return Promise.resolve(isValidPassword);
    } catch (error) {
      Logger.getInstance().error(
        "UserService: findUserByEmailExc",
        "errorInfo:" + JSON.stringify(error)
      );
      return Promise.reject(error);
    }
  };

  public generateToken = async (user: any): Promise<string> => {
    try {
      const token = jwt.sign(
        {
          _id: user._id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
        },
        EnvConfig.getConfig().JWT_SECRET as string
      );
      return Promise.resolve(token);
    } catch (error) {
      Logger.getInstance().error(
        "UserService: generateToken",
        "errorInfo:" + JSON.stringify(error)
      );
      return Promise.reject(error);
    }
  };
}

export default UserService;
