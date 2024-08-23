import { Router } from "express";
import { upload } from "../../middlewares/multer.js";
import { UserController } from "./user.controller.js";

const router = Router();

// post routes
router.post(
  "/register",
  // upload.fields([{ name: "avatar", maxCount: 1 }]),
  upload.single("avatar"),
  UserController.insertIntoDB
);

router.post(
  "/create",
  upload.single("file"),
  UserController.createAdminOrManager
);

// get routes
router.get("/", UserController.getAllUsers);
router.get("/:id", UserController.getUserById);

// update
router.patch("/:id", UserController.updateUserById);

// delete
router.delete("/:id", UserController.deleteUserFromDB);

export const userRoute = router;
