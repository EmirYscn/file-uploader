import express from "express";

import * as filesController from "../controllers/filesController";
import * as authController from "../controllers/authController";

import { uploadFiles } from "../middlewares/multer";

const router = express.Router();

router.get("/:shareUrl/shared", filesController.getSharedFile);
router.get(
  "/shared/:shareUrl/files/:folderId",
  filesController.getSharedSubFiles
);
router.get(
  "/main/:userId",
  authController.isAuth,
  filesController.getMainFiles
);
router.get(
  "/:folderId",
  authController.isAuth,
  filesController.getFilesByFolder
);

router.post(
  "/upload",
  uploadFiles,
  authController.isAuth,
  filesController.uploadFile
);

router.get("/:id/download", filesController.downloadFile);
router.get(
  "/:id/shareUrl",
  authController.isAuth,
  filesController.createShareUrl
);
router.patch("/:id", authController.isAuth, filesController.updateFile);
router.delete("/:id", authController.isAuth, filesController.deleteFile);

export { router };
