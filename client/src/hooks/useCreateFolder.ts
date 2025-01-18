import { useContext, useState } from "react";
import { Folder, Folder as FolderType } from "../types/models";
import { createFolder } from "../services/apiFolders";
import { UserContext } from "../contexts/userContext";
import { useLocation } from "react-router";

function useCreateFolder(
  setFolders: React.Dispatch<React.SetStateAction<FolderType[] | undefined>>
) {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(UserContext);
  const location = useLocation();
  const pathSegments = location.pathname.split("/");
  const folderId = Number(pathSegments[pathSegments.length - 1]);

  async function handleCreateFolder(data: FolderType) {
    const folderData = {
      ...data,
      userId: user!.id,
      parentId: isNaN(folderId) === true ? null : folderId,
    };
    try {
      setIsLoading(true);
      const newFolder = await createFolder(folderData);
      setFolders((prevFolder) => {
        if (!prevFolder) return prevFolder;

        const updatedFolders = [...prevFolder, newFolder!];
        return updatedFolders;
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return { handleCreateFolder, isLoading };
}

export default useCreateFolder;
