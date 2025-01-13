import { Prisma } from "@prisma/client";
import { prisma } from "./queries";

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
