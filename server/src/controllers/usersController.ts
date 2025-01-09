import { NextFunction, Request, Response } from "express-serve-static-core";
import * as db from "../db/queries";

export const getUserFolders = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const folders = await db.getFoldersById(+userId);
  console.log(folders);
  res.send(folders);
};
