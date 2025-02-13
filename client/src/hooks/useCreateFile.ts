import { useContext, useState } from "react";
import { useLocation } from "react-router";

import { createFile } from "../services/apiFiles";

import { File as FileType } from "../types/models";
import { AuthContext } from "../contexts/authContext";

function useCreateFile(
  setFiles: React.Dispatch<React.SetStateAction<FileType[] | undefined>>
) {
  const {
    auth: { user },
  } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  const pathSegments = location.pathname.split("/");
  const folderId = Number(pathSegments[pathSegments.length - 1]);

  async function handleCreateFile(files: File[] | null) {
    if (!files || files.length === 0) return;

    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));
    formData.append("userId", user!.id.toString());
    formData.append("folderId", isNaN(folderId) ? "" : folderId.toString());

    try {
      setIsLoading(true);
      const newFiles = await createFile(formData);
      setFiles((prevFiles) => {
        if (!prevFiles) return prevFiles;

        const updatedFiles = [...prevFiles, ...newFiles!];
        return updatedFiles;
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return { handleCreateFile, isLoading };
}

export default useCreateFile;
