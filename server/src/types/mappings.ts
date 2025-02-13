// server/src/types/mappings.ts
import { Prisma } from "@prisma/client";
import * as SharedTypes from "shared-types/types";

// Type assertions to ensure Prisma types match shared types
type ValidateUser = Prisma.UserGetPayload<{}> extends Omit<
  SharedTypes.User,
  "password"
>
  ? true
  : false;
type ValidateFile = Prisma.FileGetPayload<{}> extends SharedTypes.File
  ? true
  : false;
type ValidateFolder = Prisma.FolderGetPayload<{}> extends SharedTypes.Folder
  ? true
  : false;
type ValidateFolderShare =
  Prisma.FolderShareGetPayload<{}> extends SharedTypes.FolderShare
    ? true
    : false;
type ValidateFileShare =
  Prisma.FileShareGetPayload<{}> extends SharedTypes.FileShare ? true : false;
type ValidateSession = Prisma.SessionGetPayload<{}> extends SharedTypes.Session
  ? true
  : false;

// Helper types for common queries
export type UserWithRelations = Prisma.UserGetPayload<{
  include: {
    files: true;
    folders: true;
    folderShare: true;
    fileShare: true;
  };
}>;

export type FolderWithRelations = Prisma.FolderGetPayload<{
  include: {
    files: true;
    children: true;
    sharedTo: true;
    createdBy: true;
  };
}>;

export type FileWithRelations = Prisma.FileGetPayload<{
  include: {
    uploadedBy: true;
    folder: true;
    sharedTo: true;
  };
}>;
