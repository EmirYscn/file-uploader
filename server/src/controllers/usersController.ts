import { NextFunction, Request, Response } from "express";
import * as db from "../db/queries";

export const getFolders = async (req: Request, res: Response): Promise<any> => {
  const { userId } = req.params;
  try {
    const folders = await db.getFoldersById(Number(userId));
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
