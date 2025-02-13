import { createContext } from "react";

import { File, FileWithUserInfo } from "../types/models";

type FilesContextType = {
  files: FileWithUserInfo[] | undefined;
  setFiles: React.Dispatch<React.SetStateAction<File[] | undefined>>;
  isLoading: boolean;
};

export const FilesContext = createContext({} as FilesContextType);
