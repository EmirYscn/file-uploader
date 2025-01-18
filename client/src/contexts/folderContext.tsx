import { createContext } from "react";
import { Folder } from "../types/models";

type FolderContextType = {
  folders: Folder[] | undefined;
  setFolders: React.Dispatch<React.SetStateAction<Folder[] | undefined>>;
  isLoading: boolean;
};

export const FolderContext = createContext({} as FolderContextType);
