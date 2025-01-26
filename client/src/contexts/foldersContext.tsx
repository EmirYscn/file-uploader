import { createContext } from "react";
import { Folder, FolderShare, FolderWithShareInfo } from "../types/models";

type FoldersContextType = {
  folders: FolderWithShareInfo[] | undefined;
  setFolders: React.Dispatch<
    React.SetStateAction<FolderWithShareInfo[] | undefined>
  >;
  isLoading: boolean;
};

export const FoldersContext = createContext({} as FoldersContextType);
