import { createContext } from "react";

export type ShareContextType = {
  shareUrl: string | null;
  setShareUrl: React.Dispatch<React.SetStateAction<string | null>>;
  fetchFilesAndFoldersByShareUrlAndFolderId?: (
    folderId: number
  ) => Promise<void>;
};

export const ShareContext = createContext<ShareContextType>({
  shareUrl: null,
  setShareUrl: () => {},
});
