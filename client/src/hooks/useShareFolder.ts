import { useState } from "react";

import { shareFolder } from "../services/apiFolders";

import { Data } from "../ui/Modals/ShareFolder";

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
