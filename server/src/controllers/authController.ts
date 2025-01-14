import { NextFunction, Request, Response } from "express";
import { User } from "@prisma/client";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";

import * as db from "../db/user.queries";

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

  // Create User

  // Hash Password
  const { password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = { ...req.body, password: hashedPassword };
  console.log("Created User: ", user);
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
  req: Request<{}, {}, User>,
  res: Response
): Promise<any> => {
  const { email, password } = req.body;

  try {
    const user = await db.findUser(email);
    if (password !== user?.password) {
      return res.status(400).json({
        error: {
          message: "Passwords do not match",
        },
      });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
};

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) next();
  else res.status(401).json({ msg: "You are not authorized" });
};
