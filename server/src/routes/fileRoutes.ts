import express from "express";
import * as filesController from "../controllers/filesController";

const router = express.Router();

router.get("/api/files/byUserId/:userId", filesController.getFilesByUserId);
router.get(
  "/api/files/byFolderId/:folderId",
  filesController.getFilesByFolderId
);
router.patch("/api/files/:fileId", filesController.renameFile);
router.delete("/api/files/:fileId", filesController.deleteFile);

export { router };
