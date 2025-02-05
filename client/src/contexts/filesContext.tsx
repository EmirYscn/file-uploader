import { createContext } from "react";

import { File } from "../types/models";

type FilesContextType = {
  files: File[] | undefined;
  setFiles: React.Dispatch<React.SetStateAction<File[] | undefined>>;
  isLoading: boolean;
};

export const FilesContext = createContext({} as FilesContextType);
