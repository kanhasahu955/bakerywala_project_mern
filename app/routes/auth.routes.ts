import { Router } from "express";
import { rateLimit } from "express-rate-limit";
import UserController from "@controller/user.controller";
import UserService from "@services/user.service";

const AuthRouter: Router = Router();
const userService = new UserService();
const userController = new UserController(userService);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 10, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: "You can only make 10 requests every 15 minutes",
});

AuthRouter.route("/register").all(userController.register, limiter);
AuthRouter.route("/login").all(userController.login, limiter);

export default AuthRouter;
