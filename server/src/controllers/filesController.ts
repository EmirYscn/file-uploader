import { Request, Response } from "express";
import * as db from "../db/file.queries";

export const getFilesByUserId = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { userId } = req.params;
  try {
    const files = await db.getFilesByUserId(+userId);
    return res.status(200).json(files);
  } catch (error) {
    console.error(error);
    // return res.status(500).json({ error: "Failed to delete file" });
  }
};
export const getFilesByFolderId = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { folderId } = req.params;
  try {
    const files = await db.getFilesByFolderId(+folderId);
    return res.status(200).json(files);
  } catch (error) {
    console.error(error);
    // return res.status(500).json({ error: "Failed to delete file" });
  }
};

export const deleteFile = async (req: Request, res: Response): Promise<any> => {
  const { fileId } = req.params;
  try {
    await db.deleteFile(+fileId);
    return res.status(200).json({ message: "File deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to delete file" });
  }
};

export const renameFile = async (req: Request, res: Response): Promise<any> => {
  const { fileId } = req.params;
  try {
    await db.updateFile(+fileId, req.body);
    return res.status(200).json({ message: "File updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to update file" });
  }
};
