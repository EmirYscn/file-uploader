import { useState } from "react";
import { File as FileType } from "../types/models";
import { renameFile } from "../services/apiFiles";

function useRenameFile(
  setFiles: React.Dispatch<React.SetStateAction<FileType[] | undefined>>
) {
  const [isLoading, setIsLoading] = useState(false);

  async function handleRenameFile(fileId: number, data: FileType) {
    try {
      setIsLoading(true);
      await renameFile(fileId, data);
      setFiles((prevFiles) => {
        if (!prevFiles) return prevFiles;

        const updatedFiles = prevFiles.map((file) =>
          file.id === fileId ? { ...file, name: data.name } : file
        );
        return updatedFiles;
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
