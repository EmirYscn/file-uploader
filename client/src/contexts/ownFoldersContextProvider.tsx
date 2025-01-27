import useOwnFolders from "../hooks/useOwnFolders";
import { FoldersContext } from "./ownFoldersContext";

type FolderContextProviderProps = {
  children: React.ReactNode;
};

function FoldersContextProvider({ children }: FolderContextProviderProps) {
  const { ownFolders, setOwnFolders, isLoading } = useOwnFolders();
  return (
    <FoldersContext.Provider value={{ ownFolders, setOwnFolders, isLoading }}>
      {children}
    </FoldersContext.Provider>
  );
}

export default FoldersContextProvider;
