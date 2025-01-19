import express from "express";
import * as foldersController from "../controllers/foldersController";

const router = express.Router();

router.get(
  "/api/folders/byFolderId/:folderId",
  foldersController.getFoldersByFolderId
);
router.get(
  "/api/folders/byUserId/:userId",
  foldersController.getFoldersByUserId
);
router.get("/api/folder/:folderId", foldersController.getFolder);
router.delete("/api/folder/:folderId", foldersController.deleteFolder);
router.post("/api/folder/createFolder", foldersController.createFolder);
router.patch("/api/folder/:folderId", foldersController.renameFolder);

export { router };
