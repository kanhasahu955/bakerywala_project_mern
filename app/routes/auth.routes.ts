import { Router } from "express";
import { rateLimit } from "express-rate-limit";
import UserService from "@controller/user.controller";

const AuthRouter: Router = Router();

const userSvc = new UserService();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 10, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: "You can only make 10 requests every 15 minutes",
});

AuthRouter.route("/me").all(userSvc.createUserExc, limiter);
export default AuthRouter;
