import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";

import { getFolder, getMainFolders } from "../services/apiFolders";

import { FolderWithShareInfo } from "../types/models";
import { AuthContext } from "../contexts/authContext";

function useFolders(): {
  folders: FolderWithShareInfo[] | undefined;
  setFolders: React.Dispatch<
    React.SetStateAction<FolderWithShareInfo[] | undefined>
  >;
  isLoading: boolean;
} {
  const location = useLocation();
  const [folders, setFolders] = useState<FolderWithShareInfo[] | undefined>([]);
  const [isLoading, setIsLoading] = useState(false);

  const {
    auth: { user },
  } = useContext(AuthContext);

  useEffect(() => {
    async function fetchFolders() {
      try {
        setIsLoading(true);

        const pathSegments = location.pathname.split("/");
        const folderId = Number(pathSegments[pathSegments.length - 1]);

        const folders = isNaN(folderId)
          ? await getMainFolders(user!.id)
          : await getFolder(folderId);

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
