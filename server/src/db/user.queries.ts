import { Prisma, User } from "@prisma/client";
import { prisma } from "./queries";
import bcrypt, { hash } from "bcryptjs";

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

export const findUserById = async (userId: number) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    return user;
  } catch (error) {
    console.log(error);
  }
};

export const searchUser = async (email: string) => {
  try {
    const users = await prisma.user.findMany({
      where: { email: { contains: email, mode: "insensitive" } },
    });
    return users;
  } catch (error) {
    console.error("Database error:", error);
    throw new Error("Failed to fetch users");
  }
};

export const updateUser = async (
  user: Partial<User> & {
    password?: string;
    currentPassword?: string;
    confirmPassword?: string;
  },
  userId: number
) => {
  try {
    const { confirmPassword, currentPassword, password, ...updatedFields } =
      user;
    const newFields = { ...updatedFields, password };
    // Hash Password
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      newFields.password = hashedPassword;
    }
    await prisma.user.update({
      where: { id: userId },
      data: newFields,
    });
  } catch (error) {
    console.error("Database error:", error);
    throw new Error("Failed to update user");
  }
};
