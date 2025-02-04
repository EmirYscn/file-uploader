import { useContext, useState } from "react";
import { shareFolder, updateShareFolder } from "../services/apiFolders";
import { UserContext } from "../contexts/userContext";
import { Data } from "../ui/Modals/ShareFolder";
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
