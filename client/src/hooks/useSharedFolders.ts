import { useContext, useEffect, useState } from "react";
import { FolderWithShareInfo } from "../types/models";
import {
  getFoldersByFolderId,
  getSharedFoldersByUserId,
} from "../services/apiFolders";
import { UserContext } from "../contexts/userContext";
import { useLocation } from "react-router";

function useSharedFolders(): {
  sharedFolders: FolderWithShareInfo[] | undefined;
  setSharedFolders: React.Dispatch<
    React.SetStateAction<FolderWithShareInfo[] | undefined>
  >;
  isLoading: boolean;
} {
  const location = useLocation();
  const [sharedFolders, setSharedFolders] = useState<
    FolderWithShareInfo[] | undefined
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(UserContext);

  useEffect(() => {
    async function fetchFolders() {
      try {
        setIsLoading(true);

        const pathSegments = location.pathname.split("/");
        const folderId = Number(pathSegments[pathSegments.length - 1]);

        const folders = isNaN(folderId)
          ? await getSharedFoldersByUserId(user!.id)
          : await getFoldersByFolderId(folderId);

        setSharedFolders(folders);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    if (user) fetchFolders();
  }, [user, location.pathname]);

  return { sharedFolders, setSharedFolders, isLoading };
}

export default useSharedFolders;
