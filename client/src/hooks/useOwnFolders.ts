import { useContext, useEffect, useState } from "react";
import { Folder, FolderWithShareInfo } from "../types/models";
import {
  getFoldersByFolderId,
  getFoldersByUserId,
  getOwnFoldersByUserId,
} from "../services/apiFolders";
import { UserContext } from "../contexts/userContext";
import { useLocation } from "react-router";

function useOwnFolders(): {
  ownFolders: Folder[] | undefined;
  setOwnFolders: React.Dispatch<React.SetStateAction<Folder[] | undefined>>;
  isLoading: boolean;
} {
  const location = useLocation();
  const [ownFolders, setOwnFolders] = useState<Folder[] | undefined>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(UserContext);

  useEffect(() => {
    async function fetchFolders() {
      try {
        setIsLoading(true);

        const pathSegments = location.pathname.split("/");
        const folderId = Number(pathSegments[pathSegments.length - 1]);
        // const type = pathSegments[1];

        const folders = isNaN(folderId)
          ? await getOwnFoldersByUserId(user!.id)
          : await getFoldersByFolderId(folderId);

        setOwnFolders(folders);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    if (user) fetchFolders();
  }, [user, location.pathname]);

  return { ownFolders, setOwnFolders, isLoading };
}

export default useOwnFolders;
