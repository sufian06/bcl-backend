import express from "express";
import { upload } from "../../middlewares/multer.js";
import { TeamControlller } from "./team.controller.js";

const router = express.Router();

router.post("/", upload.single("file"), TeamControlller.insertIntoDB);

router.get("/", TeamControlller.getAllFromDB);
router.get("/:id", TeamControlller.getByIdFromDB);

router.patch("/:id", TeamControlller.updateOneInDB);
router.patch("/:id/add-player", TeamControlller.addPlayer);

router.delete("/:id", TeamControlller.deleteByIdFromDB);

export const TeamRouter = router;
