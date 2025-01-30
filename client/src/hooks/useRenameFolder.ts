import { useState } from "react";
import { Folder as FolderType, FolderWithShareInfo } from "../types/models";
import { renameFolder } from "../services/apiFolders";

function useRenameFolder(
  setFolders: React.Dispatch<
    React.SetStateAction<FolderWithShareInfo[] | undefined>
  >
) {
  const [isLoading, setIsLoading] = useState(false);

  async function handleRenameFolder(folderId: number, data: FolderType) {
    try {
      setIsLoading(true);
      await renameFolder(folderId, data);
      setFolders((prevFolders) => {
        if (!prevFolders) return prevFolders;

        const updatedFiles = prevFolders.map((folder) =>
          folder.id === folderId ? { ...folder, name: data.name } : folder
        );
        return updatedFiles;
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return { handleRenameFolder, isLoading };
}

export default useRenameFolder;
