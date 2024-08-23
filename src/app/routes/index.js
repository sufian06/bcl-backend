import { Router } from "express";
import { PlayerRoute } from "../modules/player/player.route.js";
import { TeamRouter } from "../modules/team/team.route.js";
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
  {
    path: "/player",
    route: PlayerRoute,
  },
  {
    path: "/team",
    route: TeamRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
