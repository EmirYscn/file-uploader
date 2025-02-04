import express from "express";
import * as foldersController from "../controllers/foldersController";
import * as authController from "../controllers/authController";

const router = express.Router();

router.get("/api/folders/:shareUrl/shared", foldersController.getSharedFolder);
router.get(
  "/api/shared/:shareUrl/folders/:folderId",
  foldersController.getSharedSubFolder
);
router.use(authController.isAuth);

router.get("/api/folders/main/:userId", foldersController.getMainFolders);
router.post("/api/folders", foldersController.createFolder);
router.patch("/api/folders/folderShare", foldersController.updateFolderShare);
router.delete("/api/folders/folderShare", foldersController.deleteFolderShare);
router.post("/api/folders/share", foldersController.shareFolder);
router
  .route("/api/folders/:id")
  .get(foldersController.getFolder)
  .patch(foldersController.updateFolder)
  .delete(foldersController.deleteFolder);

router.get("/api/folders/:id/shareUrl", foldersController.createShareUrl);
router.get("/api/folder/:id", foldersController.getFolderNameAndParentId);
router.get("/api/folder/:id/sharedUsers", foldersController.getSharedUsers);

// router.get(
//   "/api/folders/byFolderId/:folderId",
//   foldersController.getFoldersByFolderId
// );

// router.get(
//   "/api/folders/:type/byUserId/:userId",
//   foldersController.getMainFolders
// );

// router.post("/api/folder/createFolder", foldersController.createFolder);
// router.get("/api/folder/:folderId", foldersController.getFolder);
// router.patch("/api/folder/:folderId", foldersController.updateFolder);
// router.delete("/api/folder/:folderId", foldersController.deleteFolder);

export { router };
