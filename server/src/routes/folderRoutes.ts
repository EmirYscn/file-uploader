import express from "express";
import * as foldersController from "../controllers/foldersController";

const router = express.Router();

// router.get(
//   "/api/folders/byFolderId/:folderId",
//   foldersController.getFoldersByFolderId
// );

router.get(
  "/api/folders/:type/byUserId/:userId",
  foldersController.getMainFolders
);

router.get("/api/folders/main/:userId", foldersController.getMainFolders);
router.post("/api/folders", foldersController.createFolder);
router
  .route("/api/folders/:id")
  .get(foldersController.getFolder)
  .patch(foldersController.updateFolder)
  .delete(foldersController.deleteFolder);

router.post("/api/folders/share", foldersController.shareFolder);
// router.post("/api/folder/createFolder", foldersController.createFolder);
// router.get("/api/folder/:folderId", foldersController.getFolder);
// router.patch("/api/folder/:folderId", foldersController.updateFolder);
// router.delete("/api/folder/:folderId", foldersController.deleteFolder);

export { router };
