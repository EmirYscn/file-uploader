import { Request, Response } from "express";
import * as db from "../db/folder.queries";

export const getFoldersByFolderId = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { folderId } = req.params;
  console.log(folderId);
  try {
    const folders = await db.getFoldersByParentId(+folderId);
    console.log(folders);
    return res.status(200).json(folders);
  } catch (error) {
    console.log(error);
  }
};
export const getFoldersByUserId = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { userId } = req.params;
  console.log(userId);
  try {
    const folders = await db.getFoldersById(+userId);
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

export const deleteFolder = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { folderId } = req.params;
  try {
    await db.deleteFolder(+folderId);
    return res.status(200).json({ message: "File deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to delete file" });
  }
};
