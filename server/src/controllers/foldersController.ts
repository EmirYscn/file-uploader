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
  const { type, userId } = req.params;
  try {
    const folders = await db.getFoldersById(+userId, type);
    return res.status(200).json(folders);
  } catch (error) {
    console.log(error);
  }
};

export const getOwnFoldersByUserId = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { userId } = req.params;
  console.log(userId);
  try {
    const folders = await db.getFoldersById(+userId);
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

export const createFolder = async (
  req: Request,
  res: Response
): Promise<any> => {
  const folderData = req.body;
  try {
    const folder = await db.createFolder(folderData);
    return res.status(200).json(folder);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to create folder" });
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

export const renameFolder = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { folderId } = req.params;
  try {
    await db.updateFolder(+folderId, req.body);
    return res.status(200).json({ message: "Folder updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to update Folder" });
  }
};

export const shareFolder = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { folderId, userId } = req.body;
  try {
    await db.shareFolder(+folderId, +userId);
    return res.status(200).json({ message: "Folder shared successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to share Folder" });
  }
};
