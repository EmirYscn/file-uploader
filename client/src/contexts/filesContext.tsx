import { createContext } from "react";
import { FileWithShareInfo } from "../types/models";

type FilesContextType = {
  files: FileWithShareInfo[] | undefined;
  setFiles: React.Dispatch<
    React.SetStateAction<FileWithShareInfo[] | undefined>
  >;
  isLoading: boolean;
};

export const FilesContext = createContext({} as FilesContextType);
