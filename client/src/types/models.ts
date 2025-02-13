import type { Models } from "../../../server/src/types/models";
// import { Models } from "shared-types/models";
import {
  User as UserType,
  File as FileType,
  Folder as FolderType,
  FolderShare as FolderShareType,
  FileShare as FileShareType,
  FolderWithShareInfo as FolderWithShareInfoType,
  FileWithUserInfo as FileWithUserInfoType,
  UserWithShareInfo as UserWithShareInfoType,
} from "shared-types/types";

// export type User = Models["User"];
// export type File = Models["File"];
// export type Folder = Models["Folder"];
// export type FolderShare = Models["FolderShare"];
// export type FileShare = Models["FileShare"];
// export type FolderWithShareInfo = Folder & FolderShare;
// export type FileWithUserInfo = File & { uploadedBy: { username: string } };
// export type UserWithShareInfo = User & FolderShare;

export type User = UserType;
export type File = FileType;
export type Folder = FolderType;
export type FolderShare = FolderShareType;
export type FileShare = FileShareType;
export type FolderWithShareInfo = FolderWithShareInfoType;
export type FileWithUserInfo = FileWithUserInfoType;
export type UserWithShareInfo = UserWithShareInfoType;
