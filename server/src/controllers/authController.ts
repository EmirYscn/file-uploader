import { NextFunction, Request, Response } from "express";

import { User } from "@prisma/client";

import { validationResult } from "express-validator";

import bcrypt from "bcryptjs";

import * as db from "../db/user.queries";

import passport from "../strategies/passport";

export const signup = async (
  req: Request<{}, {}, User>,
  res: Response
): Promise<any> => {
  // Validate Result, If Error send error back to client
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(403).json({
      body: { ...req.body, password: null },
      error: result.array(),
    });
  }

  const { password } = req.body;
  const hashedPassword = await bcrypt.hash(password!, 10);

  const user = { ...req.body, password: hashedPassword };
  try {
    await db.createUser(user);

    return res
      .status(200)
      .json({ message: "User created successfully" }) as Response;
  } catch (error) {
    console.error(error);

    return res
      .status(500)
      .json({ message: "Internal server error" }) as Response;
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

export const verifyAuth = async (req: Request, res: Response) => {
  if (req.isAuthenticated()) {
    res.json({ isAuthenticated: true, user: req.user });
  } else {
    res.json({ isAuthenticated: false });
  }
};

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) next();
  else res.status(401).json({ msg: "You are not authorized" });
};
