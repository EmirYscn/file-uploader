import {
  Folder,
  FolderWithShareInfo,
  UserWithShareInfo,
} from "../types/models";

import { Data } from "../ui/Modals/ShareFolder";

const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";

export const getMainFolders = async (userId: number) => {
  try {
    const res = await fetch(`${API_BASE_URL}/api/folders/main/${userId}`, {
      method: "GET",
      credentials: "include",
    });

    const folders: FolderWithShareInfo[] = await res.json();

    return folders;
  } catch (error) {
    console.log(error);
  }
};

export const getFolder = async (folderId: number) => {
  try {
    const res = await fetch(`${API_BASE_URL}/api/folders/${folderId}`, {
      method: "GET",
      credentials: "include",
    });

    const folders: FolderWithShareInfo[] = await res.json();

    return folders;
  } catch (error) {
    console.log(error);
  }
};

export const createFolder = async (
  data: Folder
): Promise<Folder | undefined> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/folders`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const deleteFolder = async (folderId: number) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/folders/${folderId}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteFolders = async (folderIds: number[]) => {
  try {
    const deleteRequests = folderIds.map(async (folderId) => {
      const response = await fetch(`${API_BASE_URL}/api/folders/${folderId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(
          `Failed to delete file ${folderId}: ${response.statusText}`
        );
      }
    });

    await Promise.all(deleteRequests);

    console.log(`Deleted ${folderIds.length} files successfully.`);
  } catch (error) {
    console.error("Error deleting files:", error);
  }
};

export const renameFolder = async (folderId: number, data: Folder) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/folders/${folderId}`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateFolder = async (folderId: number, data: Partial<Folder>) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/folders/${folderId}`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.log(error);
  }
};

export const shareFolder = async (formData: Data, folderId: number) => {
  try {
    const data = {
      ...formData,
      folderId,
    };

    const response = await fetch(`${API_BASE_URL}/api/folders/share`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateShareFolder = async (
  formData: Partial<UserWithShareInfo>
) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/folders/folderShare`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.log(error);
  }
};

export const getFolderByShareUrl = async (shareUrl: string) => {
  try {
    const res = await fetch(`${API_BASE_URL}/api/folders/${shareUrl}/shared`, {
      method: "GET",
      credentials: "include",
    });

    const folder: Folder[] = await res.json();

    return folder;
  } catch (error) {
    console.log(error);
  }
};

export async function getFoldersByShareUrlAndFolderId(
  shareUrl: string,
  folderId: number
) {
  const res = await fetch(
    `${API_BASE_URL}/api/folders/shared/${shareUrl}/folders/${folderId}`,
    { method: "GET", credentials: "include" }
  );

  if (!res.ok) throw new Error("Failed to fetch shared folders");

  const folders: Folder[] = await res.json();

  return folders;
}

export async function getFolderNameAndParentIdById(folderId: number) {
  const res = await fetch(`${API_BASE_URL}/api/folders/folder/${folderId}`, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) throw new Error("Failed to fetch shared folders");

  const folderName: Folder = await res.json();

  return folderName;
}

export async function getSharedUsers(folderId: number) {
  const res = await fetch(
    `${API_BASE_URL}/api/folders/folder/${folderId}/sharedUsers`,
    { method: "GET", credentials: "include" }
  );

  if (!res.ok) throw new Error("Failed to fetch shared users");

  const users: UserWithShareInfo[] = await res.json();

  return users;
}

export async function deleteFolderShare(userId: number, folderId: number) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/folders/folderShare`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, folderId }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.log(error);
  }
}
