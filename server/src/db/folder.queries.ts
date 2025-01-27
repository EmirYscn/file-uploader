import { accessType, Folder, FolderShare } from "@prisma/client";
import { prisma } from "./queries";

async function getOwnFolders(userId: number) {
  const userFolders = await prisma.user.findFirst({
    where: { id: userId },
    include: { folders: { where: { parentId: null } } },
  });
  return userFolders?.folders;
}

async function getSharedFolders(userId: number) {
  const sharedFolders = await prisma.folderShare.findMany({
    where: { userId },
    include: { folder: true },
  });

  return sharedFolders.map((share) => ({
    ...share.folder,
    accessType: share.accessType,
    expireDate: share.expireDate,
  }));
}

async function getAllFolders(userId: number) {
  const userFolders = await prisma.user.findFirst({
    where: { id: userId },
    select: {
      folders: { where: { parentId: null } },
      folderShare: {
        select: { folder: true, accessType: true, expireDate: true },
      },
    },
  });
  const combinedFolders = [
    ...(userFolders?.folders ?? []),
    ...(userFolders?.folderShare.map((share) => ({
      ...share.folder,
      accessType: share.accessType,
      expireDate: share.expireDate,
    })) ?? []),
  ];
  return combinedFolders;
}

export const getOwnFoldersByUserId = async (userId: number) => {
  try {
    const folders = getOwnFolders(userId);
    return folders;
  } catch (error) {
    throw error;
  }
};

export const getSharedFoldersByUserId = async (userId: number) => {
  try {
    const folders = getSharedFolders(userId);
    return folders;
  } catch (error) {
    throw error;
  }
};

export const getFoldersByUserId = async (userId: number, type?: string) => {
  try {
    let folders;
    if (type === "shared") {
      folders = await getSharedFolders(userId);
    } else if (type === "myFolders") {
      folders = await getOwnFolders(userId);
    } else {
      folders = await getAllFolders(userId);
    }
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
    throw error;
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
    return await prisma.$transaction(async (prisma) => {
      const folder = await prisma.folder.create({
        data: folderData,
      });

      console.log(`Folder created successfully.`);
      return folder;
    });
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

export const shareFolder = async (body: {
  accessType: accessType;
  expireDate: Date;
  folderId: number;
  users: number[];
}) => {
  const { accessType, expireDate, folderId, users } = body;
  try {
    for (const userId of users) {
      await prisma.folderShare.upsert({
        where: {
          folderId_userId: {
            folderId,
            userId,
          },
        },
        update: {
          accessType,
          expireDate,
        },
        create: {
          accessType,
          expireDate,
          folderId,
          userId,
        },
      });
    }

    console.log(
      `Folder with ID ${folderId} shared to Users with ID ${users} successfully.`
    );
  } catch (error) {
    console.error("Error sharing folder:", error);
    throw new Error("Failed to share folder");
  }
};
