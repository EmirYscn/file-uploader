import { useContext, useState } from "react";
import { File as FileType, FolderWithShareInfo } from "../types/models";
import { UserContext } from "../contexts/userContext";
import { useLocation } from "react-router";
import { createFile } from "../services/apiFiles";

function useCreateFile(
  setFiles: React.Dispatch<
    React.SetStateAction<FolderWithShareInfo[] | undefined>
  >
) {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(UserContext);
  const location = useLocation();
  const pathSegments = location.pathname.split("/");
  const folderId = Number(pathSegments[pathSegments.length - 1]);

  async function handleCreateFile(file: File | null) {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("userId", user!.id.toString());
    formData.append("folderId", isNaN(folderId) ? "" : folderId.toString());

    try {
      setIsLoading(true);
      const newFile = await createFile(formData);
      setFiles((prevFiles) => {
        if (!prevFiles) return prevFiles;

        const updatedFiles = [...prevFiles, newFile!];
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
