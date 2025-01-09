import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export const getUsers = async () => {
  const users = await prisma.user.findMany();
  console.log(users);
  return users;
};
export const getFolders = async () => {
  const folders = await prisma.folder.findMany();
  return folders;
};

export const getUserById = async (userId: number) => {
  const user = await prisma.user.findFirst({
    where: { id: userId },
  });
  console.log(user);
  return user;
};

export const getFoldersById = async (userId: number) => {
  const folders = await prisma.user.findFirst({
    where: { id: userId },
    select: {
      folders: true,
    },
  });
  return folders;
};
