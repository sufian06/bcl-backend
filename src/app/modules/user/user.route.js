import { Router } from "express";
import { UserController } from "./user.controller.js";
import { UserService } from "./user.service.js";

const router = Router();

router.delete("/:id", UserController.deleteUserFromDB);
router.post("/", UserService.insertIntoDB);

export const userRoute = router;
