import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import path from "node:path";

import * as authController from "./controllers/authController";
import * as usersController from "./controllers/usersController";
import * as filesController from "./controllers/filesController";
import * as db from "./db/queries";
import { validateForm } from "./middlewares/validateForm";

dotenv.config({ path: "./.env" });

const app = express();

// app middleware to use form body in post router
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public")));

app.post("/api/signup", validateForm, authController.signup);
app.post("/api/login", authController.login);

app.get("/api/folders/:userId", usersController.getFolders);
app.get("/api/folder/:folderId", usersController.getFolder);
// app.post("/api/folder/:folderId", usersController.getFolder);
// app.delete("/api/folder/:folderId", usersController.getFolder);

// app.get("/api/files/:fileId", usersController.getFolder);
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
