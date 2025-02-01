import { Folder, FolderWithShareInfo } from "../types/models";
import { Data } from "../ui/ShareFolder";

// export const getFoldersByUserId = async (userId: number, type: string) => {
//   console.log("in userId");
//   try {
//     const res = await fetch(`/api/folders/${type}/byUserId/${userId}`);
//     const folders: FolderWithShareInfo[] = await res.json();

//     return folders;
//   } catch (error) {
//     console.log(error);
//   }
// };

export const getMainFolders = async (userId: number) => {
  try {
    const res = await fetch(`/api/folders/main/${userId}`);
    const folders: FolderWithShareInfo[] = await res.json();
    return folders;
  } catch (error) {
    console.log(error);
  }
};

// export const getFoldersByFolderId = async (folderId: number) => {
//   try {
//     const res = await fetch(`/api/folders/${folderId}`);
//     const folders: FolderWithShareInfo[] = await res.json();
//     return folders;
//   } catch (error) {
//     console.log(error);
//   }
// };

export const getFolder = async (folderId: number) => {
  try {
    const res = await fetch(`/api/folders/${folderId}`);
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
    const response = await fetch("/api/folders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    console.log("folder created");
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const deleteFolder = async (folderId: number) => {
  try {
    const response = await fetch(`/api/folders/${folderId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    console.log("folder deleted");
  } catch (error) {
    console.log(error);
  }
};

export const renameFolder = async (folderId: number, data: Folder) => {
  try {
    const response = await fetch(`/api/folders/${folderId}`, {
      method: "PATCH",
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
    const response = await fetch(`/api/folders/${folderId}`, {
      method: "PATCH",
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
    console.log(data);
    const response = await fetch("/api/folders/share", {
      method: "POST",
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

export const getFolderByShareUrl = async (shareUrl: string) => {
  try {
    const res = await fetch(`/api/folders/${shareUrl}/shared`);
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
  const res = await fetch(`/api/shared/${shareUrl}/folders/${folderId}`);
  if (!res.ok) throw new Error("Failed to fetch shared folders");
  const folders: Folder[] = await res.json();
  return folders;
}
