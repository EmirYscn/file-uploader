import { prisma } from "./queries";

export const getFilesByUserId = async (userId: number) => {
  try {
    const files = await prisma.file.findMany({
      where: { userId, folderId: null },
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

export const deleteFile = async (fileId: number) => {
  try {
    await prisma.file.delete({
      where: { id: fileId },
    });
    console.log(`File with ID ${fileId} deleted successfully.`);
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
