import { Router } from "express";
import { PlayerController } from "./player.controller.js";

const router = Router();

router.get("/", PlayerController.getAllPlayerFromDB);
router.get("/:id", PlayerController.getByIdFromDB);
router.patch("/:id", PlayerController.updateOneFromDB);

export const PlayerRoute = router;
