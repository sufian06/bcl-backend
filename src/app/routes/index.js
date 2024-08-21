import { Router } from "express";
import { userRoute } from "../modules/user/user.route.js";

const router = Router();

const moduleRoutes = [
  //   {
  //     path: "/register",
  //     route: Register,
  //   },
  {
    path: "/user",
    route: userRoute,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
