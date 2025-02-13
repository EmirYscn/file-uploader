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
  files?: File[];
  folders?: Folder[];
  folderShare?: FolderShare[];
  fileShare?: FileShare[];
};

export type File = {
  id: number;
  name: string;
  url: string;
  size: number;
  uploadDate: Date;
  userId: number;
  folderId?: number | null;
  shareUrl?: string | null;
  uploadedBy?: User;
  folder?: Folder | null;
  sharedTo?: FileShare[];
};

export type Folder = {
  id: number;
  name: string;
  fileCount: number;
  size: number;
  createdAt: Date;
  parentId?: number | null;
  userId: number;
  shareUrl?: string | null;
  parent?: Folder | null;
  children?: Folder[];
  files?: File[];
  createdBy?: User;
  sharedTo?: FolderShare[];
};

export type FolderShare = {
  id: number;
  folderId: number;
  userId: number;
  expireDate?: Date | null;
  accessType?: AccessType | null;
  folder?: Folder;
  user?: User;
};

export type FileShare = {
  id: number;
  fileId: number;
  userId: number;
  expireDate?: Date | null;
  accessType?: AccessType | null;
  file?: File;
  user?: User;
};

export type Session = {
  id: string;
  sid: string;
  data: string;
  expiresAt: Date;
};

// Composite types
export type FolderWithShareInfo = Folder & {
  sharedTo: FolderShare[];
};

export type FileWithUserInfo = File & {
  uploadedBy: {
    username: string;
  };
};

export type UserWithShareInfo = User & {
  folderShare: FolderShare[];
};
