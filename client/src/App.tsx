import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import AppLayout from "./ui/AppLayout";
import Home from "./pages/Home";
import GlobalStyles from "./styles/GlobalStyles";
import SharedPage from "./pages/SharedPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PageNotFound from "./pages/PageNotFound";
import UserContextProvider from "./contexts/userContext";
import MyFolders from "./pages/MyFolders";
import All from "./ui/All";
import Own from "./ui/Own";
import Shared from "./ui/Shared";
import FoldersContextProvider from "./contexts/ownFoldersContextProvider";
import FilesContextProvider from "./contexts/filesContextProvider";
import SharedFoldersContextProvider from "./contexts/sharedFoldersContextProvider";
import SubFolder from "./ui/SubFolder";

function App() {
  return (
    <>
      <UserContextProvider>
        <GlobalStyles />
        <BrowserRouter>
          <FoldersContextProvider>
            <SharedFoldersContextProvider>
              <FilesContextProvider>
                <Routes>
                  <Route element={<AppLayout />}>
                    <Route index element={<Navigate replace to="all" />} />
                    <Route path="all/*" element={<Home />}>
                      <Route index element={<All />} />
                      <Route path="folder/:folderId" element={<SubFolder />} />
                      <Route
                        path="folder/shared/:folderId"
                        element={<SubFolder />}
                      />
                    </Route>

                    <Route path="myFolders/*" element={<MyFolders />}>
                      <Route index element={<Own />} />
                      <Route path="folder/:folderId" element={<Own />} />
                    </Route>

                    <Route path="shared/*" element={<SharedPage />}>
                      <Route index element={<Shared />} />
                      <Route
                        path="folder/shared/:folderId"
                        element={<Shared />}
                      />
                    </Route>
                    {/* <Route path='file/:fileId' element={<File/>}/> */}
                  </Route>
                  <Route path="login" element={<Login />} />
                  <Route path="signup" element={<Signup />} />
                  <Route path="*" element={<PageNotFound />} />
                </Routes>
              </FilesContextProvider>
            </SharedFoldersContextProvider>
          </FoldersContextProvider>
        </BrowserRouter>
      </UserContextProvider>
    </>
  );
}

export default App;
