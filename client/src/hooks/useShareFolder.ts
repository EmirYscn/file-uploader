import { useContext, useState } from "react";
import { shareFolder } from "../services/apiFolders";
import { UserContext } from "../contexts/userContext";
import { Data } from "../ui/ShareFolder";

function useShareFolder() {
  const [isLoading, setIsLoading] = useState(false);

  async function handleShareFolder(data: Data, folderId: number) {
    try {
      setIsLoading(true);
      await shareFolder(data, folderId);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return { handleShareFolder, isLoading };
}

export default useShareFolder;
