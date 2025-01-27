import { createContext } from "react";
import { FolderWithShareInfo } from "../types/models";

type FoldersContextType = {
  sharedFolders: FolderWithShareInfo[] | undefined;
  setSharedFolders: React.Dispatch<
    React.SetStateAction<FolderWithShareInfo[] | undefined>
  >;
  isLoading: boolean;
};

export const SharedFoldersContext = createContext({} as FoldersContextType);
