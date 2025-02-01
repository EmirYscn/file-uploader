import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { File } from "../types/models";
import { getFilesByFolder, getMainFiles } from "../services/apiFiles";
import { UserContext } from "../contexts/userContext";

function useFiles(): {
  files: File[] | undefined;
  setFiles: React.Dispatch<React.SetStateAction<File[] | undefined>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
} {
  const location = useLocation();
  const [files, setFiles] = useState<File[] | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(UserContext);

  useEffect(() => {
    async function fetchFiles() {
      try {
        setIsLoading(true);

        const pathSegments = location.pathname.split("/");
        const folderId = Number(pathSegments[pathSegments.length - 1]);
        // const type = pathSegments[1];

        const files = isNaN(folderId)
          ? await getMainFiles(user!.id)
          : await getFilesByFolder(folderId);

        setFiles(files);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    if (user) fetchFiles();
  }, [user, location.pathname]);

  return { files, setFiles, isLoading, setIsLoading };
}

export default useFiles;
