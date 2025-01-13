import { useState } from "react";
import { Folder as FolderType } from "../types/models";
import { deleteFile } from "../services/apiFiles";

function useDeleteFile(
  setFolder: React.Dispatch<React.SetStateAction<FolderType | undefined>>
) {
  const [isLoading, setIsLoading] = useState(false);

  async function handleDeleteFile(fileId: number) {
    try {
      setIsLoading(true);
      await deleteFile(fileId);
      setFolder((prevFolder) => {
        if (!prevFolder) return prevFolder;

        const updatedFiles = prevFolder.files.filter(
          (file) => file.id !== fileId
        );
        const newFolder = { ...prevFolder, files: updatedFiles };
        return newFolder;
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return { handleDeleteFile, isLoading };
}

export default useDeleteFile;
