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
