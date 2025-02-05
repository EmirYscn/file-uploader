import { useState } from "react";

import { File as FileType } from "../types/models";

import { deleteFile } from "../services/apiFiles";

function useDeleteFile(
  setFiles: React.Dispatch<React.SetStateAction<FileType[] | undefined>>
) {
  const [isLoading, setIsLoading] = useState(false);

  async function handleDeleteFile(fileId: number) {
    try {
      setIsLoading(true);
      await deleteFile(fileId);
      setFiles((prevFiles) => {
        if (!prevFiles) return prevFiles;

        const updatedFiles = prevFiles.filter((file) => file.id !== fileId);
        return updatedFiles;
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
