import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import path from "node:path";
import cors from "cors";
import { validateForm } from "./middlewares/validateForm";

import * as authController from "./controllers/authController";
import * as usersController from "./controllers/usersController";
import * as filesController from "./controllers/filesController";
import * as foldersController from "./controllers/foldersController";
import { sessionMiddleware } from "./middlewares/session";
import passport from "./strategies/passport";
import { router as folderRouter } from "./routes/folderRoutes";
import { router as fileRouter } from "./routes/fileRoutes";
import { router as userRouter } from "./routes/userRoutes";

dotenv.config({ path: "./.env" });

const app = express();

// app middleware to use form body in post router
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public")));

// app.use(
//   cors({
//     origin: "http://localhost:5173", // Replace with your frontend URL
//     credentials: true, // Allow credentials (cookies)
//   })
// );
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());

app.use(userRouter);
app.use(authController.isAuth);
app.use(folderRouter);
app.use(fileRouter);

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
