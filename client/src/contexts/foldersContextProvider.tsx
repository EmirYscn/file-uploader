import useFolders from "../hooks/useFolders";

import { FoldersContext } from "./foldersContext";

type FolderContextProviderProps = {
  children: React.ReactNode;
};

function FoldersContextProvider({ children }: FolderContextProviderProps) {
  const { folders, setFolders, isLoading } = useFolders();
  return (
    <FoldersContext.Provider value={{ folders, setFolders, isLoading }}>
      {children}
    </FoldersContext.Provider>
  );
}

export default FoldersContextProvider;
