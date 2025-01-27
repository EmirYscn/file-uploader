import useOwnFolders from "../hooks/useOwnFolders";
import useSharedFolders from "../hooks/useSharedFolders";
import { SharedFoldersContext } from "./sharedFoldersContext";

type FolderContextProviderProps = {
  children: React.ReactNode;
};

function SharedFoldersContextProvider({
  children,
}: FolderContextProviderProps) {
  const { sharedFolders, setSharedFolders, isLoading } = useSharedFolders();
  return (
    <SharedFoldersContext.Provider
      value={{ sharedFolders, setSharedFolders, isLoading }}
    >
      {children}
    </SharedFoldersContext.Provider>
  );
}

export default SharedFoldersContextProvider;
