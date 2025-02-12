import express, { NextFunction, Request, Response } from "express";

import dotenv from "dotenv";
import path from "node:path";
import cors from "cors";

import { sessionMiddleware } from "./middlewares/session";

import * as authController from "./controllers/authController";

import passport from "./strategies/passport";

import { router as folderRouter } from "./routes/folderRoutes";
import { router as fileRouter } from "./routes/fileRoutes";
import { router as userRouter } from "./routes/userRoutes";
import { router as authRouter } from "./routes/authRoutes";

dotenv.config({ path: "./.env" });

const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// app middleware to use form body in post router
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public")));

app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/user", userRouter);
app.use("/api/files", fileRouter);
app.use("/api/folders", folderRouter);
app.use("/api/auth", authRouter);

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
