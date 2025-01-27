import express from "express";
import * as foldersController from "../controllers/foldersController";

const router = express.Router();

// NEW
router.get("/api/folders/own/:userId", foldersController.getOwnFolders);
router.get("/api/folders/shared/:userId", foldersController.getSharedFolders);
// NEW
router.get("/api/folders/:folderId", foldersController.getFoldersByFolderId);

// OLD
router.get(
  "/api/folders/:type/byUserId/:userId",
  foldersController.getFoldersByUserId
);

router.get(
  "/api/folders/byFolderId/:folderId",
  foldersController.getFoldersByFolderId
);

router.get("/api/folder/:folderId", foldersController.getFolder);
router.delete("/api/folder/:folderId", foldersController.deleteFolder);
router.post("/api/folder/createFolder", foldersController.createFolder);
router.post("/api/folder/shareFolder", foldersController.shareFolder);
router.patch("/api/folder/:folderId", foldersController.updateFolder);

export { router };
