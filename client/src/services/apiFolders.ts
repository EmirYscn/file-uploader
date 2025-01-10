import { Folder } from "../types/models";

export const getFolders = async (userId: number) => {
  try {
    const res = await fetch(`/api/folders/${userId}`);
    const folders: Folder[] = await res.json();
    return folders;
  } catch (error) {
    console.log(error);
  }
};
