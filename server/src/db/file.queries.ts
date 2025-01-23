import { prisma } from "./queries";

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
    const file = await prisma.file.delete({
      where: { id: fileId },
    });
    console.log(`File with ID ${fileId} deleted successfully.`);
    return file;
  } catch (error) {
    console.error("Error deleting file:", error);
    throw new Error("Failed to delete file");
  }
};

export const updateFile = async (fileId: number, data: File) => {
  try {
    await prisma.file.update({
      where: { id: fileId },
      data: data,
    });
    console.log(`File with ID ${fileId} updated successfully.`);
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
    const file = await prisma.file.create({
      data: {
        name: originalname,
        size,
        url: fileUrl,
        userId,
        folderId,
      },
    });
    console.log(`File with ID ${file.id} created successfully.`);
    return file;
  } catch (error) {
    console.error("Error creating file:", error);
    throw new Error("Failed to create file");
  }
};
