import { NextFunction, Request, Response } from "express";
import passport from "../strategies/passport";
import * as db from "../db/folder.queries";
import { User } from "@prisma/client";

export const getFolders = async (req: Request, res: Response): Promise<any> => {
  const { userId } = req.params;
  console.log(userId);
  try {
    const folders = await db.getFoldersById(Number(userId));
    console.log(folders);
    return res.status(200).json(folders);
  } catch (error) {
    console.log(error);
  }
};

export const getFolder = async (req: Request, res: Response): Promise<any> => {
  const { folderId } = req.params;
  try {
    const folder = await db.getFolderById(+folderId);
    return res.status(200).json(folder);
  } catch (error) {
    console.log(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate(
    "local",
    (err: Error | null, user: User | false, info: { message: string }) => {
      if (err) {
        return res.status(500).json({ error: "Internal server error" });
      }
      if (!user) {
        return res.status(401).json({ error: info.message });
      }
      req.logIn(user, (err) => {
        if (err) {
          return res.status(500).json({ error: "Failed to log in user" });
        }
        return res.status(200).json(user);
      });
    }
  )(req, res, next);
};

export const logout = async (req: Request, res: Response) => {
  req.logOut(() => {
    res.status(200).json({ message: "Logged out successfully" });
  });
};
