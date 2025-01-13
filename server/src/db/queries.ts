import { File, Prisma, PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export const createUser = async (user: Prisma.UserCreateInput) => {
  try {
    await prisma.user.create({
      data: {
        email: user.email,
        username: user.username,
        password: user.password,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const findUser = async (email: string) => {
  try {
    const user = await prisma.user.findFirst({
      where: { email: email },
    });
    return user;
  } catch (error) {
    console.log(error);
  }
};

export const getFoldersById = async (userId: number) => {
  try {
    const folders = await prisma.folder.findMany({
      where: { user_id: userId },
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
        files: true,
      },
    });
    return folder;
  } catch (error) {
    console.log(error);
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
