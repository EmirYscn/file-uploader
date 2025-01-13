import { Request, Response } from "express";
import * as db from "../db/file.queries";

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
