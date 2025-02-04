import type { Models } from "../../../server/src/types/models";

export type User = Models["User"];
export type File = Models["File"];
export type Folder = Models["Folder"];
export type FolderShare = Models["FolderShare"];
export type FileShare = Models["FileShare"];
export type FolderWithShareInfo = Folder & FolderShare;
export type FileWithUserInfo = File & { uploadedBy: { username: string } };
export type UserWithShareInfo = User & FolderShare;
