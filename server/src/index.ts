import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import path from "node:path";
import { validateForm } from "./middlewares/validateForm";

import * as authController from "./controllers/authController";
import * as usersController from "./controllers/usersController";
import * as filesController from "./controllers/filesController";
import * as foldersController from "./controllers/foldersController";
import { sessionMiddleware } from "./middlewares/session";
import passport from "./strategies/passport";

dotenv.config({ path: "./.env" });

const app = express();

// app middleware to use form body in post router
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public")));

app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());

app.post("/api/signup", validateForm, authController.signup);
app.post("/api/login", usersController.login);

app.get("/api/current-user", (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).json({ message: "Not authenticated" });
  }
});

app.get("/api/logout", usersController.logout);

// app.use(authController.isAuth);
app.get(
  "/api/folders/byFolderId/:folderId",
  foldersController.getFoldersByFolderId
);
app.get("/api/folders/byUserId/:userId", foldersController.getFoldersByUserId);
app.get("/api/folder/:folderId", foldersController.getFolder);
app.delete("/api/folder/:folderId", foldersController.deleteFolder);
app.post("/api/folder/createFolder", foldersController.createFolder);
app.patch("/api/folder/:folderId", foldersController.renameFolder);

app.get("/api/files/byUserId/:userId", filesController.getFilesByUserId);
app.get("/api/files/byFolderId/:folderId", filesController.getFilesByFolderId);
app.patch("/api/files/:fileId", filesController.renameFile);
app.delete("/api/files/:fileId", filesController.deleteFile);

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    status: "fail",
    data: {
      message: "this route is not defined",
    },
  });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
