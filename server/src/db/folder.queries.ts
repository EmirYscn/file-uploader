import { prisma } from "./queries";

export const getFoldersById = async (userId: number) => {
  try {
    const folders = await prisma.folder.findMany({
      where: { userId, parentId: null },
    });
    return folders;
  } catch (error) {
    console.log(error);
  }
};

export const getFoldersByParentId = async (folderId: number) => {
  try {
    const folders = await prisma.folder.findMany({
      where: { parentId: folderId },
    });
    return folders;
  } catch (error) {
    console.log(error);
  }
};

export const getFolderById = async (folderId: number) => {
  try {
    const folder = await prisma.folder.findFirst({
      where: { id: folderId },
      select: {
        children: true,
        files: true,
      },
    });
    return folder;
  } catch (error) {
    console.log(error);
  }
};

export const deleteFolder = async (folderId: number) => {
  try {
    await prisma.folder.delete({
      where: { id: folderId },
    });
    console.log(`File with ID ${folderId} deleted successfully.`);
  } catch (error) {
    console.error("Error deleting file:", error);
    throw new Error("Failed to delete file");
  }
};
