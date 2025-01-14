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
