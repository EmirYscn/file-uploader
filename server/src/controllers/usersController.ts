import { Request, Response } from "express";

import * as db from "../db/user.queries";

import { validationResult } from "express-validator";

import { uploadAvatar } from "../middlewares/supabase";

// export const login = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   passport.authenticate(
//     "local",
//     (err: Error | null, user: User | false, info: { message: string }) => {
//       if (err) {
//         return res.status(500).json({ error: "Internal server error" });
//       }
//       if (!user) {
//         return res.status(401).json({ error: "Invalid email or password" });
//       }
//       req.logIn(user, (err) => {
//         if (err) {
//           return res.status(500).json({ error: "Failed to log in user" });
//         }
//         return res.status(200).json(user);
//       });
//     }
//   )(req, res, next);
// };

// export const logout = async (req: Request, res: Response) => {
//   req.logOut(() => {
//     res.status(200).json({ message: "Logged out successfully" });
//   });
// };

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
    await db.updateUser(req.body, +id);

    return res.status(200).json({ message: "Successfully updated user" });
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
