import { accessType, Folder, FolderShare, Prisma } from "@prisma/client";
import { prisma } from "./queries";
import { supabase } from "../middlewares/supabase";
import { v4 as uuidv4 } from "uuid";

const getSubfolders = async (parentId: number): Promise<number[]> => {
  const subfolders = await prisma.folder.findMany({
    where: { parentId },
    select: { id: true },
  });

  const subfolderIds = subfolders.map((folder) => folder.id);

  for (const subId of subfolderIds) {
    const deeperSubfolders = await getSubfolders(subId);
    subfolderIds.push(...deeperSubfolders);
  }

  return subfolderIds;
};

async function deleteFilesRecursively(folderId: number) {
  try {
    // Step 1: Fetch all subfolders recursively
    const getAllSubfolders = async (folderId: number): Promise<number[]> => {
      const subfolders = await prisma.folder.findMany({
        where: { parentId: folderId },
        select: { id: true },
      });

      const subfolderIds = subfolders.map((folder) => folder.id);

      // Recursively fetch subfolders of each subfolder
      for (const subfolderId of subfolderIds) {
        const nestedSubfolderIds = await getAllSubfolders(subfolderId);
        subfolderIds.push(...nestedSubfolderIds);
      }

      return subfolderIds;
    };

    const allSubfolderIds = await getAllSubfolders(folderId);

    // Step 2: Fetch all files across folder and subfolders
    const allFolderIds = [folderId, ...allSubfolderIds];
    const allFiles = await prisma.file.findMany({
      where: { folderId: { in: allFolderIds } },
    });

    // Step 3: Delete files from Supabase bucket
    const filePaths = allFiles.map((file) => file.url);
    if (filePaths.length > 0) {
      const { error } = await supabase.storage.from("files").remove(filePaths);

      if (error) {
        console.error("Error deleting files from bucket:", error);
        throw new Error("Failed to delete files from bucket");
      }
    }

    console.log(
      `Folder and all nested files and subfolders deleted successfully.`
    );
  } catch (error) {
    console.error("Error deleting folder and nested files:", error);
    throw new Error("Failed to delete folder and nested files");
  }
}

// async function updateSharedStatusRecursively(
//   folderId: number,
//   isShared: boolean,
//   isLimited: boolean
// ) {
//   await prisma.folder.update({
//     where: { id: folderId },
//     data: { isSharedSubfolder: isShared, isAccessLimited: isLimited },
//   });

//   const subfolders = await prisma.folder.findMany({
//     where: { parentId: folderId },
//   });

//   for (const subfolder of subfolders) {
//     await updateSharedStatusRecursively(subfolder.id, isShared, isLimited);
//   }
// }

async function shareSubfolders(
  folderId: number,
  userId: number,
  accessType: accessType,
  expireDate: Date
) {
  const subfolders = await prisma.folder.findMany({
    where: { parentId: folderId },
  });

  for (const subfolder of subfolders) {
    await prisma.folderShare.upsert({
      where: {
        folderId_userId: {
          folderId: subfolder.id,
          userId,
        },
      },
      update: {
        accessType,
        expireDate,
      },
      create: {
        folderId: subfolder.id,
        userId,
        accessType,
        expireDate,
      },
    });

    await shareSubfolders(subfolder.id, userId, accessType, expireDate);
  }
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

async function getOwnFolders(userId: number) {
  const userFolders = await prisma.user.findFirst({
    where: { id: userId },
    include: { folders: { where: { parentId: null } } },
  });
  return userFolders?.folders;
}

async function getAllFolders(userId: number) {
  const userFolders = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      folders: { where: { parentId: null } }, // User's own root-level folders
      folderShare: {
        select: {
          folder: true, // The folder shared with the user
          accessType: true,
          expireDate: true,
        },
        where: {
          folder: { parentId: null }, // Only root-level shared folders
        },
      },
    },
  });

  const combinedFolders = [
    ...(userFolders?.folders ?? []), // User's own root-level folders
    ...(userFolders?.folderShare.map((share) => ({
      ...share.folder,
      accessType: share.accessType,
      expireDate: share.expireDate,
    })) ?? []), // Shared root-level folders
  ];

  return combinedFolders;
}

export const getMainFolders = async (userId: number) => {
  try {
    const folders = await getAllFolders(userId);
    return folders;
  } catch (error) {
    console.log(error);
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

export const getFolder = async (folderId: number, userId: number) => {
  try {
    // Get subfolders owned by the user
    const ownedSubfolders = await prisma.folder.findMany({
      where: { parentId: folderId, userId },
    });

    // Get shared subfolders specifically shared with the given user
    const sharedSubFolders = await prisma.folderShare.findMany({
      where: {
        userId, // Ensure the folder is shared with this user
        folder: { parentId: folderId }, // Ensure it is a subfolder of the given folderId
      },
      include: { folder: true }, // Include the actual folder details
    });

    // Combine both sets of subfolders with added shared folder properties
    const combinedFolders = [
      ...ownedSubfolders,
      ...sharedSubFolders.map((share) => ({
        ...share.folder,
        accessType: share.accessType,
        expireDate: share.expireDate,
      })),
    ];

    // Ensure uniqueness of folders by their IDs
    const uniqueFolders = Array.from(
      new Map(combinedFolders.map((folder) => [folder.id, folder])).values()
    );

    return uniqueFolders;
  } catch (error) {
    console.error("Error fetching folders:", error);
    throw new Error("Failed to fetch folders");
  }
};

// export const getFolderById = async (folderId: number) => {
//   try {
//     const folder = await prisma.folder.findFirst({
//       where: { id: folderId },
//       select: {
//         children: true,
//         files: true,
//         isSharedSubfolder: true,
//       },
//     });
//     return folder;
//   } catch (error) {
//     console.log(error);
//   }
// };

export const createFolder = async (folderData: Folder) => {
  try {
    return await prisma.$transaction(async (prisma) => {
      // Create the folder
      const folder = await prisma.folder.create({
        data: folderData,
      });

      // If the folder has a parent folder
      if (folderData.parentId) {
        // Get the parent folder's shared information
        const parentFolder = await prisma.folder.findUnique({
          where: { id: folderData.parentId },
          include: {
            sharedTo: true, // Users the parent folder is shared with
            createdBy: true, // Parent folder owner
          },
        });

        // Prepare data for new `folderShare` entries
        const newShares = [];

        // Include all shared users except the current user
        if (parentFolder?.sharedTo) {
          for (const share of parentFolder.sharedTo) {
            if (share.userId !== folderData.userId) {
              newShares.push({
                accessType: share.accessType,
                expireDate: share.expireDate,
                folderId: folder.id,
                userId: share.userId,
              });
            }
          }
        }

        // Include the parent folder owner if not the current user
        if (
          parentFolder?.createdBy?.id &&
          parentFolder.createdBy.id !== folderData.userId
        ) {
          newShares.push({
            accessType: "FULL" as accessType,
            expireDate: null,
            folderId: folder.id,
            userId: parentFolder.createdBy.id,
          });
        }

        // Bulk create new `folderShare` entries
        if (newShares.length > 0) {
          await prisma.folderShare.createMany({ data: newShares });
        }
      }

      console.log(`Folder created successfully.`);
      return folder;
    });
  } catch (error) {
    console.error("Error creating folder:", error);
    throw new Error("Failed to create folder");
  }
};

export const createFolderShareUrl = async (folderId: number) => {
  try {
    const shareUrl = uuidv4();

    const updatedFolder = await prisma.folder.update({
      where: { id: folderId },
      data: { shareUrl },
    });
    return updatedFolder;
  } catch (error) {
    console.error("Error generating folder share URL:", error);
    throw new Error("Failed to create folder share URL");
  }
};

export const deleteFolder = async (folderId: number) => {
  try {
    await deleteFilesRecursively(folderId);
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
    return await prisma.$transaction(async (prisma) => {
      const oldFolder = await prisma.folder.findUnique({
        where: { id: folderId },
      });
      if (!oldFolder) throw new Error("Folder not found");

      const updatedFolder = await prisma.folder.update({
        where: { id: folderId },
        data: data,
      });

      if (data.parentId && data.parentId !== oldFolder.parentId) {
        const parentShare = await prisma.folderShare.findMany({
          where: { folderId: data.parentId },
          select: { userId: true, accessType: true, expireDate: true },
        });

        // check if new parent folder is already shared
        if (parentShare.length > 0) {
          // recursively add subfolders to folderShare table
          const subfolderIds = await getSubfolders(folderId);

          subfolderIds.push(folderId);

          const parentFolder = await prisma.folder.findUnique({
            where: { id: data.parentId },
            select: { userId: true },
          });

          if (!parentFolder) throw new Error("Parent folder not found");

          await Promise.all(
            parentShare.map((share) =>
              prisma.folderShare.createMany({
                data: subfolderIds.map((subfolderId) => ({
                  folderId: subfolderId,
                  userId: share.userId,
                  accessType: share.accessType,
                  expireDate: share.expireDate,
                })),
                skipDuplicates: true,
              })
            )
          );
          await prisma.folderShare.createMany({
            data: subfolderIds.map((subfolderId) => ({
              folderId: subfolderId,
              userId: parentFolder.userId,
              accessType: "FULL",
              expireDate: null,
            })),
            skipDuplicates: true,
          });
        }
      }
      console.log(`Folder with ID ${folderId} updated successfully.`);
    });
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

      await shareSubfolders(folderId, userId, accessType, expireDate);
    }

    console.log(
      `Folder with ID ${folderId} shared to Users with ID ${users} successfully.`
    );
  } catch (error) {
    console.error("Error sharing folder:", error);
    throw new Error("Failed to share folder");
  }
};

export const getSharedFolder = async (shareUrl: string) => {
  try {
    const folders = await prisma.folder.findMany({
      where: { shareUrl },
    });
    return folders;
  } catch (error) {
    console.error("Error getting shared folder:", error);
    throw new Error("Failed to get shared folder");
  }
};

export const getSubFolders = async (folderId: number) => {
  try {
    const folders = await prisma.folder.findMany({
      where: { parentId: folderId },
    });
    return folders;
  } catch (error) {
    console.error("Error getting shared subfolders:", error);
    throw new Error("Failed to get shared subfolders");
  }
};
