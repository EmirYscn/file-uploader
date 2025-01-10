import { Prisma, PrismaClient } from "@prisma/client";

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

// export const getUsers = async () => {
//   const users = await prisma.user.findMany();
//   console.log(users);
//   return users;
// };

// export const getFolders = async () => {
//   try {
//     const folders = await prisma.folder.findMany();
//     return folders;
//   } catch (error) {
//     throw new Error("Error fetching");
//   }
// };

// export const getUserById = async (userId: number) => {
//   const user = await prisma.user.findFirst({
//     where: { id: userId },
//   });
//   console.log(user);
//   return user;
// };

export const getFoldersById = async (userId: number) => {
  console.log(userId);
  try {
    const folders = await prisma.folder.findMany({
      where: { user_id: userId },
    });
    return folders;
  } catch (error) {
    console.log(error);
  }
};
