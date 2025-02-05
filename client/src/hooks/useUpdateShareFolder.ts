import { useState } from "react";
import { updateShareFolder } from "../services/apiFolders";

import { UserWithShareInfo } from "../types/models";

function useUpdateShareFolder() {
  const [isLoading, setIsLoading] = useState(false);

  async function handleUpdateShareFolder(data: Partial<UserWithShareInfo>) {
    try {
      setIsLoading(true);
      await updateShareFolder(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return { handleUpdateShareFolder, isLoading };
}

export default useUpdateShareFolder;
