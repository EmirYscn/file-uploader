import { Request, Response } from "express";
import * as db from "../db/file.queries";
// import {
//   deleteFileSB,
//   supabase,
//   supabaseUrl,
//   uploadFileSB,
// } from "../middlewares/supabase";
import * as sb from "../middlewares/supabase";
import { Readable } from "stream"; // Node.js Readable stream

export const getFilesByUserId = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { type, userId } = req.params;
  try {
    const files = await db.getFilesByUserId(+userId, type);
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
    const file = await db.deleteFile(+fileId);
    await sb.deleteFile(file.url);
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

export const uploadFile = async (req: Request, res: Response): Promise<any> => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });

  const { userId, folderId } = req.body;

  try {
    const fileUrl = await sb.uploadFile(req.file, userId);
    const file = await db.createFile(
      req.file,
      fileUrl,
      +userId,
      folderId === "" ? null : +folderId
    );
    return res.status(201).json(file);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to create file" });
  }
};

export const downloadFile = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { fileId } = req.params;
  const fileUrl = await db.getFileUrl(+fileId);
  if (!fileUrl)
    return res.status(400).json({ message: "Couldnt find the file" });
  try {
    const file = await sb.downloadFile(fileUrl);
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    res.set({
      "Content-Disposition": `attachment; filename="${fileUrl
        .split("/")
        .pop()}"`,
      "Content-Type": file.type,
    });
    const readableStream = Readable.from(buffer);
    readableStream.pipe(res).on("finish", () => res.end());
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Error downloading file" });
  }
};
