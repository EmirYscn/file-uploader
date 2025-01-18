import useFolders from "../hooks/useFolders";
import { FolderContext } from "./folderContext";

type FolderContextProviderProps = {
  children: React.ReactNode;
};

function FolderContextProvider({ children }: FolderContextProviderProps) {
  const { folders, setFolders, isLoading } = useFolders();
  return (
    <FolderContext.Provider value={{ folders, setFolders, isLoading }}>
      {children}
    </FolderContext.Provider>
  );
}

export default FolderContextProvider;
