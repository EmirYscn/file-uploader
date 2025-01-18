import { createContext } from "react";
import { Folder } from "../types/models";

type FoldersContextType = {
  folders: Folder[] | undefined;
  setFolders: React.Dispatch<React.SetStateAction<Folder[] | undefined>>;
  isLoading: boolean;
};

export const FoldersContext = createContext({} as FoldersContextType);
