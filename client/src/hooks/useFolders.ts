import { useContext, useEffect, useState } from "react";
import { Folder } from "../types/models";
import {
  getFoldersByFolderId,
  getFoldersByUserId,
} from "../services/apiFolders";
import { UserContext } from "../contexts/userContext";
import { useLocation } from "react-router";

function useFolders(): {
  folders: Folder[] | undefined;
  setFolders: React.Dispatch<React.SetStateAction<Folder[] | undefined>>;
  isLoading: boolean;
} {
  const location = useLocation();
  const [folders, setFolders] = useState<Folder[] | undefined>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(UserContext);

  useEffect(() => {
    async function fetchFolders() {
      try {
        setIsLoading(true);

        const pathSegments = location.pathname.split("/");
        const folderId = Number(pathSegments[pathSegments.length - 1]);
        const type = pathSegments[1];

        const folders = isNaN(folderId)
          ? await getFoldersByUserId(user!.id, type)
          : await getFoldersByFolderId(folderId);

        setFolders(folders);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    if (user) fetchFolders();
  }, [user, location.pathname]);

  return { folders, setFolders, isLoading };
}

export default useFolders;
