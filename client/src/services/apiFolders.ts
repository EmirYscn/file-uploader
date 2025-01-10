import { Folder } from "../types/models";

export const getFolders = async () => {
  try {
    const res = await fetch("/api/folders");
    const folders: Folder[] = await res.json();
    return folders;
  } catch (error) {
    console.log(error);
  }
};
