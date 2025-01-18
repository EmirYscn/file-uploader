import { useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import { File as FilesType } from "../types/models";
import {
  getFiles,
  getFilesByFolderId,
  getFilesByUserId,
} from "../services/apiFiles";
import { UserContext } from "../contexts/userContext";

function useFiles(): {
  files: FilesType[] | undefined;
  setFiles: React.Dispatch<React.SetStateAction<FilesType[] | undefined>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
} {
  const location = useLocation();
  // const { folderId } = useParams();
  const [files, setFiles] = useState<FilesType[] | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(UserContext);

  useEffect(() => {
    async function fetchFolder() {
      try {
        setIsLoading(true);

        const pathSegments = location.pathname.split("/");
        const folderId = Number(pathSegments[pathSegments.length - 1]);
        const type = pathSegments[1];
        const files = isNaN(folderId)
          ? await getFilesByUserId(user!.id)
          : await getFilesByFolderId(folderId);

        setFiles(files);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchFolder();
  }, [location.pathname]);

  return { files, setFiles, isLoading, setIsLoading };
}

export default useFiles;
