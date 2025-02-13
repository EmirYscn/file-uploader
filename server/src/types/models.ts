import { Prisma } from "@prisma/client";
import { PrismaModels } from "prisma-models";

// export type Models = PrismaModels<Prisma.ModelName, Prisma.TypeMap>;

export type Models = {
  User: Prisma.UserGetPayload<{}>;
  File: Prisma.FileGetPayload<{}>;
  Folder: Prisma.FolderGetPayload<{}>;
  FolderShare: Prisma.FolderShareGetPayload<{}>;
  FileShare: Prisma.FileShareGetPayload<{}>;
  // Add more models as needed
};
