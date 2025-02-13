import { Request, Response } from "express";

import * as db from "../db/user.queries";

import { validationResult } from "express-validator";

import { uploadAvatar } from "../middlewares/supabase";

export const searchUser = async (req: Request, res: Response): Promise<any> => {
  const { email } = req.query;

  if (!email || typeof email !== "string") {
    return res.status(400).json({ message: "Invalid email query parameter" });
  }

  try {
    const users = await db.searchUser(email);

    return res.status(200).json(users);
  } catch (error) {
    console.error("Error searching users:", error);

    return res.status(500).json({ message: "Error searching for users" });
  }
};

export const updateUser = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const updatedUser = await db.updateUser(req.body, +id);

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error searching users:", error);

    return res.status(500).json({ message: "Error updating user" });
  }
};

export const uploadUserPhoto = async (
  req: Request,
  res: Response
): Promise<any> => {
  const file = req.file as Express.Multer.File;

  if (!file) {
    return res.status(400).json({ message: "No files uploaded" });
  }

  const { id } = req.params;
  console.log(req.file);

  try {
    const publicUrl = await uploadAvatar(file, +id);
    const user = await db.updateUser({ avatarUrl: publicUrl }, +id);

    return res.status(200).json(user);
  } catch (error) {
    console.error("Error searching users:", error);

    return res.status(500).json({ message: "Error updating user" });
  }
};
