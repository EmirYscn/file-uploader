import { useState, ReactNode, useContext } from "react";
import { ShareContext } from "./shareContext";
import { FoldersContext } from "./foldersContext";
import { FilesContext } from "./filesContext";
import { getFolder } from "../services/apiFolders";
import { getFilesByFolder } from "../services/apiFiles";

export function ShareContextProvider({ children }: { children: ReactNode }) {
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const { setFolders } = useContext(FoldersContext);
  const { setFiles } = useContext(FilesContext);

  async function fetchFilesAndFoldersByShareUrlAndFolderId(folderId: number) {
    try {
      const folders = await getFolder(folderId);
      const files = await getFilesByFolder(folderId);
      setFolders(folders);
      setFiles(files);
    } catch (error) {
      console.error("Error fetching shared folder data:", error);
    }
  }

  return (
    <ShareContext.Provider
      value={{
        shareUrl,
        setShareUrl,
        fetchFilesAndFoldersByShareUrlAndFolderId,
      }}
    >
      {children}
    </ShareContext.Provider>
  );
}
