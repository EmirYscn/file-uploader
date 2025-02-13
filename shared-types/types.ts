// shared-types/types.ts

// Enum definitions
export enum AccessType {
  LIMITED = "LIMITED",
  FULL = "FULL",
}

// Base type definitions
export type User = {
  id: number;
  username: string;
  email: string;
  password?: string | null;
  avatarUrl?: string | null;
};

export type File = {
  id: number;
  name: string;
  size: number;
  userId: number;
  shareUrl: string | null;
  folderId: number | null;
  url: string;
  uploadDate: Date;
};

export type Folder = {
  id: number;
  name: string;
  fileCount: number;
  size: number;
  createdAt: Date;
  parentId: number | null;
  userId: number;
  shareUrl: string | null;
};

export type FolderShare = {
  id: number;
  userId: number;
  folderId: number;
  expireDate: Date | null;
  accessType: AccessType | null;
  folder?: Folder; // Optional relation
  user?: User;
};

export type FileShare = {
  id: number;
  userId: number;
  expireDate: Date | null;
  accessType: AccessType | null;
  fileId: number;
};

export type Session = {
  id: string;
  sid: string;
  data: string;
  expiresAt: Date;
};

// Composite types
export type FolderWithShareInfo = Folder & FolderShare;

export type FileWithUserInfo = File & { uploadedBy: { username: string } };

export type UserWithShareInfo = User & FolderShare;
