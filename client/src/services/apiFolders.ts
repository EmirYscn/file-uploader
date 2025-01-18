import { File, Folder } from "../types/models";

export const getFoldersByUserId = async (userId: number) => {
  console.log("in getFoldersByUserId");
  try {
    const res = await fetch(`/api/folders/byUserId/${userId}`);
    const folders: Folder[] = await res.json();
    return folders;
  } catch (error) {
    console.log(error);
  }
};

export const getFoldersByFolderId = async (folderId: number) => {
  console.log("in getFoldersByFolderId");
  try {
    const res = await fetch(`/api/folders/byFolderId/${folderId}`);
    const folders: Folder[] = await res.json();
    return folders;
  } catch (error) {
    console.log(error);
  }
};

export const createFolder = async (
  data: Folder
): Promise<Folder | undefined> => {
  try {
    console.log(data);
    const response = await fetch(`/api/folder/createFolder`, {
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
    const response = await fetch(`/api/folder/${folderId}`, {
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
