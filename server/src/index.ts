import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import path from "node:path";
import * as usersController from "./controllers/usersController";
import * as authController from "./controllers/authController";
import * as db from "./db/queries";

dotenv.config({ path: "./.env" });

const app = express();

// app middleware to use form body in post router
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public")));

app.post("/api/signup", authController.signup);
app.post("/api/login", authController.login);

app.get("/api/folders/:userId", usersController.getFolders);

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
