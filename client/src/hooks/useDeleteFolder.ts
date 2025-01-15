import { useState } from "react";
import { Folder as FolderType } from "../types/models";
import { deleteFolder } from "../services/apiFolders";

function useDeleteFolder(
  setFolders: React.Dispatch<React.SetStateAction<FolderType[] | undefined>>
) {
  const [isLoading, setIsLoading] = useState(false);

  async function handleDeleteFolder(folderId: number) {
    try {
      setIsLoading(true);
      await deleteFolder(folderId);
      setFolders((prevFolder) => {
        if (!prevFolder) return prevFolder;

        const updatedFolders = prevFolder.filter(
          (folder) => folder.id !== folderId
        );
        return updatedFolders;
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return { handleDeleteFolder, isLoading };
}

export default useDeleteFolder;
