import express from "express";
import * as foldersController from "../controllers/foldersController";
import * as authController from "../controllers/authController";

const router = express.Router();

router.get("/:shareUrl/shared", foldersController.getSharedFolder);
router.get(
  "/shared/:shareUrl/folders/:folderId",
  foldersController.getSharedSubFolder
);
// router.use(authController.isAuth);

router.get("/main/:userId", foldersController.getMainFolders);
router.post("/", foldersController.createFolder);
router.patch("/folderShare", foldersController.updateFolderShare);
router.delete("/folderShare", foldersController.deleteFolderShare);
router.post("/share", foldersController.shareFolder);
router
  .route("/:id")
  .get(foldersController.getFolder)
  .patch(foldersController.updateFolder)
  .delete(foldersController.deleteFolder);

router.get("/:id/shareUrl", foldersController.createShareUrl);

router.get("/folder/:id", foldersController.getFolderNameAndParentId);
router.get("/folder/:id/sharedUsers", foldersController.getSharedUsers);

export { router };
