import { useContext, useEffect, useState } from "react";
import { Folder } from "../types/models";
import { getFolders } from "../services/apiFolders";
import { UserContext } from "../contexts/userContext";

function useFolders(): {
  folders: Folder[] | undefined;
  isLoading: boolean;
} {
  const [folders, setFolders] = useState<Folder[] | undefined>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(UserContext);

  useEffect(() => {
    async function fetchFolders() {
      try {
        setIsLoading(true);
        const folders = await getFolders(user!.id);
        setFolders(folders);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    if (user) fetchFolders();
  }, [user]);

  return { folders, isLoading };
}

export default useFolders;
