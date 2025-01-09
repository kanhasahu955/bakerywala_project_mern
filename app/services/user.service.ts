import Logger from "@helper/logger";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class UserService {
  // Create an `User`
  public createUserExc = async (_user: any): Promise<any> => {
    try {
      // Create a new `User`
      const newUser = await prisma.user.create({
        data: {
          email: _user.email,
          password: _user.password,
          name: _user.name,
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
}

export default UserService;
