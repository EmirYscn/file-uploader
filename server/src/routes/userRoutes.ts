import express from "express";

import * as usersController from "../controllers/usersController";

import { validateUpdateForm } from "../middlewares/validateForm";
import { uploadUserPhoto } from "../middlewares/multer";
import { resizeUserPhoto } from "../middlewares/sharp";

const router = express.Router();

router.get("/search/user", usersController.searchUser);

router.patch("/:id", validateUpdateForm, usersController.updateUser);

router.post(
  "/:id/uploadAvatar",
  uploadUserPhoto,
  resizeUserPhoto,
  usersController.uploadUserPhoto
);

export { router };
