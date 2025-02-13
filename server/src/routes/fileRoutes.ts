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
router.get("/main/:userId", filesController.getMainFiles);
router.get("/:folderId", filesController.getFilesByFolder);

router.post("/upload", uploadFiles, filesController.uploadFile);

router.get("/:id/download", filesController.downloadFile);
router.get("/:id/shareUrl", filesController.createShareUrl);
router.patch("/:id", filesController.updateFile);
router.delete("/:id", filesController.deleteFile);

export { router };
