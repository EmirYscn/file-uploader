import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Folder as FolderType } from "../types/models";
import { getFolder } from "../services/apiFolders";

function useFolder(): {
  folder: FolderType | undefined;
  setFolder: React.Dispatch<React.SetStateAction<FolderType | undefined>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
} {
  const { folderId } = useParams();
  const [folder, setFolder] = useState<FolderType | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchFolder() {
      try {
        setIsLoading(true);
        const folder = await getFolder(Number(folderId));
        setFolder(folder);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchFolder();
  }, [folderId]);

  return { folder, setFolder, isLoading, setIsLoading };
}

export default useFolder;