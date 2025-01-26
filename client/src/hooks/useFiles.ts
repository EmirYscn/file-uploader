import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { FileWithShareInfo } from "../types/models";
import { getFilesByFolderId, getFilesByUserId } from "../services/apiFiles";
import { UserContext } from "../contexts/userContext";

function useFiles(): {
  files: FileWithShareInfo[] | undefined;
  setFiles: React.Dispatch<
    React.SetStateAction<FileWithShareInfo[] | undefined>
  >;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
} {
  const location = useLocation();
  const [files, setFiles] = useState<FileWithShareInfo[] | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(UserContext);

  useEffect(() => {
    async function fetchFiles() {
      try {
        setIsLoading(true);

        const pathSegments = location.pathname.split("/");
        const folderId = Number(pathSegments[pathSegments.length - 1]);
        const type = pathSegments[1];

        const files = isNaN(folderId)
          ? await getFilesByUserId(user!.id, type)
          : await getFilesByFolderId(folderId);

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
