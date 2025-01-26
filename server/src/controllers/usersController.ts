import { NextFunction, Request, Response } from "express";
import passport from "../strategies/passport";
import { User } from "@prisma/client";
import * as db from "../db/user.queries";

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
        return res.status(401).json({ error: "Invalid email or password" });
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

export const searchUser = async (req: Request, res: Response): Promise<any> => {
  const { email } = req.query;

  if (!email || typeof email !== "string") {
    return res.status(400).json({ message: "Invalid email query parameter" });
  }

  try {
    console.log(`Searching for users with email containing: ${email}`);
    const users = await db.searchUser(email);
    return res.status(200).json(users);
  } catch (error) {
    console.error("Error searching users:", error);
    return res.status(500).json({ message: "Error searching for users" });
  }
};
