import { Request, Response } from "express";
import * as db from "../db/queries";
import { User } from "@prisma/client";

export const signup = async (
  req: Request<{}, {}, User>,
  res: Response
): Promise<any> => {
  const user = req.body;
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
