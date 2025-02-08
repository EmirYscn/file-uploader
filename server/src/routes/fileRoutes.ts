import express from "express";
import * as filesController from "../controllers/filesController";
import multer from "multer";
import * as authController from "../controllers/authController";
import { uploadFiles } from "../middlewares/multer";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const router = express.Router();

router.get("/api/files/:shareUrl/shared", filesController.getSharedFile);
router.get(
  "/api/shared/:shareUrl/files/:folderId",
  filesController.getSharedSubFiles
);
router.get(
  "/api/files/main/:userId",
  authController.isAuth,
  filesController.getMainFiles
);
router.get(
  "/api/files/:folderId",
  authController.isAuth,
  filesController.getFilesByFolder
);

router.post(
  "/api/files/upload",
  uploadFiles,
  authController.isAuth,
  filesController.uploadFile
);

router.get("/api/files/:id/download", filesController.downloadFile);
router.get(
  "/api/files/:id/shareUrl",
  authController.isAuth,
  filesController.createShareUrl
);
router.patch(
  "/api/files/:id",
  authController.isAuth,
  filesController.updateFile
);
router.delete(
  "/api/files/:id",
  authController.isAuth,
  filesController.deleteFile
);

export { router };
