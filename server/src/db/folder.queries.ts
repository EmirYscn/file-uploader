import { Folder } from "@prisma/client";
import { prisma } from "./queries";

export const getFoldersById = async (userId: number, type?: string) => {
  try {
    const folders = await prisma.folder.findMany({
      where: { userId, parentId: null },
    });
    // const folders = await prisma.folder.findMany({
    //   where: { createdBy: userId },
    // });
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

export const createFolder = async (folderData: Folder) => {
  console.log(folderData);
  try {
    const folder = await prisma.folder.create({
      data: folderData,
    });
    console.log(`Folder created successfully.`);
    return folder;
  } catch (error) {
    console.error("Error creating folder:", error);
    throw new Error("Failed to create folder");
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

export const updateFolder = async (folderId: number, data: Folder) => {
  try {
    await prisma.folder.update({
      where: { id: folderId },
      data: data,
    });
    console.log(`Folder with ID ${folderId} updated successfully.`);
  } catch (error) {
    console.error("Error updating folder:", error);
    throw new Error("Failed to update folder");
  }
};
