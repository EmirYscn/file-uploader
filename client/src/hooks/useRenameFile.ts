import { useState } from "react";
import { Folder as FolderType } from "../types/models";
import { File as FileType } from "../types/models";
import { renameFile } from "../services/apiFiles";

function useRenameFile(
  setFolder: React.Dispatch<React.SetStateAction<FolderType | undefined>>
) {
  const [isLoading, setIsLoading] = useState(false);

  async function handleRenameFile(fileId: number, data: FileType) {
    try {
      setIsLoading(true);
      await renameFile(fileId, data);
      setFolder((prevFolder) => {
        if (!prevFolder) return prevFolder;

        const updatedFiles = prevFolder.files.map((file) =>
          file.id === fileId ? { ...file, name: data.name } : file
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

  return { handleRenameFile, isLoading };
}

export default useRenameFile;
