// import { useState } from "react";
// import { FolderContext } from "./folderContext";
// import { useLocation } from "react-router";

// type FolderContextProviderProps = {
//   children: React.ReactNode;
// };

// function FolderContextProvider({ children }: FolderContextProviderProps) {
//   const location = useLocation();
//   const pathSegments = location.pathname.split("/");
//   const [folderId, setFolderId] = useState<number | string | undefined>(
//     pathSegments[1]
//   );
//   return (
//     <FolderContext.Provider value={{ folderId, setFolderId }}>
//       {children}
//     </FolderContext.Provider>
//   );
// }

// export default FolderContextProvider;
