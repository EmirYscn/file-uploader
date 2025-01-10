import express, { Application, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import path from "node:path";
import { getFolders, getUserById, getUsers } from "./db/queries";
import * as usersController from "./controllers/usersController";

dotenv.config({ path: "./.env" });

const app: Application = express();

// app middleware to use form body in post router
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public")));

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Express & TypeScript Server");
});

app.get("/api/users", async (req: Request, res: Response) => {
  const users = await getUsers();
  res.send(users);
});

app.get("/api/folders", async (req: Request, res: Response) => {
  try {
    const folders = await getFolders();
    res.send(folders);
  } catch (error) {
    // throw new Error(error);
    console.log(error);
  }
});

app.get("/api/users/:userId", async (req: Request, res: Response) => {
  const { userId } = req.params;
  const user = await getUserById(+userId);
  res.send(user);
});

app.get("/api/users/:userId/folders", usersController.getUserFolders);

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
