import express, { NextFunction, Request, Response } from "express";

import dotenv from "dotenv";
import path from "node:path";
import cors from "cors";

import { sessionMiddleware } from "./middlewares/session";

import passport from "./strategies/passport";

import { router as folderRouter } from "./routes/folderRoutes";
import { router as fileRouter } from "./routes/fileRoutes";
import { router as userRouter } from "./routes/userRoutes";
import { router as authRouter } from "./routes/authRoutes";
import { Session } from "express-session";

dotenv.config({ path: "./.env" });

const app = express();
const allowedOrigins = [
  process.env.CLIENT_URL!,
  "http://localhost:5173",
  "https://file-uploader-azure.vercel.app",
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  })
);

app.set("trust proxy", 1);

// app middleware to use form body in post router
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public")));

app.use(sessionMiddleware);
// Add this after sessionMiddleware
interface CustomSession extends Session {
  isNew: boolean;
}

app.use((req, res, next) => {
  const session = req.session as CustomSession;
  console.log("Session ID:", req.sessionID);
  console.log("Is new session?:", session.isNew);
  next();
});
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
