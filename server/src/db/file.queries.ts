import { File } from "@prisma/client";
import { prisma } from "./queries";
import { v4 as uuidv4 } from "uuid";

export const getMainFiles = async (userId: number) => {
  try {
    const userFiles = await prisma.user.findMany({
      where: { id: userId },
      select: {
        files: { where: { folderId: null } },
      },
    });
    return userFiles?.flatMap((user) => user.files) ?? [];
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getFilesByFolder = async (folderId: number) => {
  try {
    const files = await prisma.file.findMany({
      where: { folderId },
    });
    return files;
  } catch (error) {
    console.error("Error deleting file:", error);
    throw new Error("Failed to delete file");
  }
};

export const getFilesByFolderId = async (folderId: number) => {
  try {
    const files = await prisma.file.findMany({
      where: { folderId },
    });
    return files;
  } catch (error) {
    console.error("Error deleting file:", error);
    throw new Error("Failed to delete file");
  }
};

export const getFilesByUserId = async (userId: number, type: string) => {
  try {
    let files;
    if (type === "shared") {
      files = await prisma.file.findMany({
        where: { sharedTo: { some: { userId: userId } } },
      });
      console.log("in shared files", files);
    } else if (type === "myFolders") {
      const userFiles = await prisma.user.findFirst({
        where: { id: userId },
        include: { files: { where: { folderId: null } } },
      });
      files = userFiles?.files;
      console.log("in own files", files);
    } else {
      const userFiles = await prisma.user.findFirst({
        where: { id: userId },
        select: {
          files: { where: { folderId: null } },
          fileShare: { select: { file: true } },
        },
      });
      files = [
        ...(userFiles?.files ?? []),
        ...(userFiles?.fileShare.map((share) => share.file) ?? []),
      ];
      console.log("in all files", files);
    }
    return files;
  } catch (error) {
    console.error("Error deleting file:", error);
    throw new Error("Failed to delete file");
  }
};

export const getFileUrl = async (fileId: number) => {
  try {
    const file = await prisma.file.findFirst({
      where: { id: fileId },
      select: {
        url: true,
      },
    });
    return file?.url;
  } catch (error) {
    console.error("Error getting fileUrl:", error);
    throw new Error("Failed to get fileUrl");
  }
};

export const deleteFile = async (fileId: number) => {
  try {
    return await prisma.$transaction(async (prisma) => {
      const file = await prisma.file.findUnique({
        where: { id: fileId },
        select: { folderId: true, size: true, url: true },
      });
      if (!file) throw new Error("File not found");

      await prisma.file.delete({
        where: { id: fileId },
      });

      if (file.folderId) {
        await prisma.folder.update({
          where: { id: file.folderId },
          data: {
            size: { decrement: file.size },
          },
        });
      }

      console.log(`File with ID ${fileId} deleted successfully.`);
      return file.url;
    });
  } catch (error) {
    console.error("Error deleting file:", error);
    throw new Error("Failed to delete file");
  }
};

export const updateFile = async (fileId: number, data: File) => {
  try {
    return await prisma.$transaction(async (prisma) => {
      const oldFile = await prisma.file.findUnique({
        where: { id: fileId },
      });
      if (!oldFile) throw new Error("File not found");

      const updatedFile = await prisma.file.update({
        where: { id: fileId },
        data: data,
      });

      // Update folder sizes if folderId changes
      if (data.folderId && data.folderId !== oldFile.folderId) {
        // Decrement size from the old folder
        if (oldFile.folderId) {
          await prisma.folder.update({
            where: { id: oldFile.folderId },
            data: {
              size: { decrement: oldFile.size },
            },
          });
        }
      }

      // Increment size in the new folder
      if (data.folderId) {
        await prisma.folder.update({
          where: { id: data.folderId },
          data: {
            size: { increment: data.size ?? oldFile.size },
          },
        });
      }

      // Update folder size if only file size changes
      if (data.size && data.size !== oldFile.size) {
        if (oldFile.folderId) {
          await prisma.folder.update({
            where: { id: oldFile.folderId },
            data: {
              size: { increment: data.size - oldFile.size },
            },
          });
        }
      }
      console.log(`File with ID ${fileId} updated successfully.`);
    });
  } catch (error) {
    console.error("Error updating file:", error);
    throw new Error("Failed to update file");
  }
};

export const createFile = async (
  file: Express.Multer.File | undefined,
  fileUrl: string,
  userId: number,
  folderId?: number | null
) => {
  if (!file) return;
  const { originalname, size } = file;
  try {
    return await prisma.$transaction(async (prisma) => {
      const file = await prisma.file.create({
        data: {
          name: originalname,
          size,
          url: fileUrl,
          userId,
          folderId,
        },
      });

      if (folderId) {
        await prisma.folder.update({
          where: { id: folderId },
          data: {
            size: { increment: size },
          },
        });
      }
      console.log(`File with ID ${file.id} created successfully.`);
      return file;
    });
  } catch (error) {
    console.error("Error creating file:", error);
    throw new Error("Failed to create file");
  }
};

export const createFileShareUrl = async (fileId: number) => {
  try {
    const shareUrl = uuidv4(); // Generate unique identifier

    const updatedFile = await prisma.file.update({
      where: { id: fileId },
      data: { shareUrl },
    });

    return updatedFile;
  } catch (error) {
    console.error("Error generating file share URL:", error);
    throw new Error("Failed to create file share URL");
  }
};

export const getSharedFile = async (shareUrl: string) => {
  try {
    const files = await prisma.file.findMany({
      where: { shareUrl },
    });
    return files;
  } catch (error) {
    console.error("Error getting shared file:", error);
    throw new Error("Failed to get shared file");
  }
};

export const getSubFiles = async (folderId: number) => {
  try {
    const files = await prisma.file.findMany({
      where: { folderId },
    });
    return files;
  } catch (error) {
    console.error("Error getting shared file:", error);
    throw new Error("Failed to get shared file");
  }
};
