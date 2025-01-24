import { useContext, useState } from "react";
import { shareFolder } from "../services/apiFolders";
import { UserContext } from "../contexts/userContext";

function useShareFolder() {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(UserContext);

  async function handleShareFolder(folderId: number) {
    try {
      setIsLoading(true);
      await shareFolder(user!.id, folderId);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return { handleShareFolder, isLoading };
}

export default useShareFolder;
