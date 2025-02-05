import useFiles from "../hooks/useFiles";

import { FilesContext } from "./filesContext";

type FilesContextProviderProps = {
  children: React.ReactNode;
};

function FilesContextProvider({ children }: FilesContextProviderProps) {
  const { files, setFiles, isLoading } = useFiles();
  return (
    <FilesContext.Provider value={{ files, setFiles, isLoading }}>
      {children}
    </FilesContext.Provider>
  );
}

export default FilesContextProvider;
