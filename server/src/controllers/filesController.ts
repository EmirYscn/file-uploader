import { Request, Response } from "express";
import { Readable } from "stream"; // Node.js Readable stream

import * as db from "../db/file.queries";
import * as sb from "../middlewares/supabase";

export const getMainFiles = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { userId } = req.params;
  try {
    const files = await db.getMainFiles(+userId);

    return res.status(200).json(files);
  } catch (error) {
    console.error(error);
  }
};

export const getFilesByFolder = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { folderId } = req.params;

  try {
    const files = await db.getFilesByFolder(+folderId);

    return res.status(200).json(files);
  } catch (error) {
    console.error(error);
  }
};

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
  }
};

export const getSharedFile = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { shareUrl } = req.params;

  try {
    const files = await db.getSharedFile(shareUrl);

    return res.status(200).json(files);
  } catch (error) {}
};

export const getSharedSubFiles = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { folderId } = req.params;

  try {
    const files = await db.getSubFiles(+folderId);

    return res.status(200).json(files);
  } catch (error) {
    console.log(error);
  }
};

export const deleteFile = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;

  try {
    const fileUrl = await db.deleteFile(+id);

    await sb.deleteFile(fileUrl);

    return res.status(200).json({ message: "File deleted successfully" });
  } catch (error) {
    console.error(error);

    return res.status(500).json({ error: "Failed to delete file" });
  }
};

export const updateFile = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;

  try {
    await db.updateFile(+id, req.body);

    return res.status(200).json({ message: "File updated successfully" });
  } catch (error) {
    console.error(error);

    return res.status(500).json({ error: "Failed to update file" });
  }
};

export const uploadFile = async (req: Request, res: Response): Promise<any> => {
  const files = req.files as Express.Multer.File[];

  if (!files || files.length === 0) {
    return res.status(400).json({ message: "No files uploaded" });
  }

  const { userId, folderId } = req.body;
  console.log(req.files);

  try {
    const uploadedFiles = await Promise.all(
      files.map(async (file: Express.Multer.File) => {
        const fileUrl = await sb.uploadFile(file, userId);
        return db.createFile(
          file,
          fileUrl,
          +userId,
          folderId === "" ? null : +folderId
        );
      })
    );

    return res.status(201).json(uploadedFiles);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to create file" });
  }
};

export const createShareUrl = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { id } = req.params;

  try {
    const file = await db.createFileShareUrl(+id);

    return res.status(200).json(file.shareUrl);
  } catch (error) {
    console.error(error);

    return res.status(500).json({ error: "Failed to create folder" });
  }
};

export const downloadFile = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { id } = req.params;

  const fileUrl = await db.getFileUrl(+id);

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
