import { createContext } from "react";

import { FileWithUserInfo } from "../types/models";

type FilesContextType = {
  files: FileWithUserInfo[] | undefined;
  setFiles: React.Dispatch<
    React.SetStateAction<FileWithUserInfo[] | undefined>
  >;
  isLoading: boolean;
};

export const FilesContext = createContext({} as FilesContextType);
