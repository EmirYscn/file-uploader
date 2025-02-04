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
import FoldersContextProvider from "./contexts/foldersContextProvider";
import FilesContextProvider from "./contexts/filesContextProvider";
import ThemeContextProvider from "./contexts/themeContextProvider";
import SharedLink from "./ui/SharedLink";
import { ShareContextProvider } from "./contexts/shareContextProvider";
import Folders from "./ui/Folders";
import SharedSubFolder from "./ui/SharedSubFolder";
import { CurrentRouteContextProvider } from "./contexts/currentRouteContextProvider";

function App() {
  return (
    <>
      <UserContextProvider>
        <ThemeContextProvider>
          <GlobalStyles />
          <BrowserRouter>
            <ShareContextProvider>
              <FoldersContextProvider>
                <FilesContextProvider>
                  <CurrentRouteContextProvider>
                    <Routes>
                      <Route element={<AppLayout />}>
                        <Route index element={<Navigate replace to="all" />} />

                        <Route path="all/*" element={<Home />}>
                          <Route index element={<All />} />
                          <Route path="folder/:folderId" element={<All />} />
                        </Route>

                        <Route path="myFolders/*" element={<MyFolders />}>
                          <Route index element={<Own />} />
                          <Route path="folder/:folderId" element={<Own />} />
                        </Route>

                        <Route path="shared/*" element={<SharedPage />}>
                          <Route index element={<Shared />} />
                          {/* <Route
                          path="sharedurl/:shareUrl"
                          element={<SharedLink />}
                        /> */}
                          <Route path="folder/:folderId" element={<Shared />} />
                        </Route>
                        <Route
                          path="sharedurl/:shareUrl/*"
                          element={<SharedLink />}
                        >
                          <Route index element={<SharedLink />} />
                          <Route
                            path="folder/:folderId"
                            element={<SharedLink />}
                          />
                        </Route>
                        {/* <Route
                        path="sharedurl/:shareUrl"
                        element={<SharedLink />}
                      />
                      <Route
                        path="sharedurl/folder/:folderId"
                        element={<Folders />}
                      /> */}
                      </Route>

                      <Route path="login" element={<Login />} />
                      <Route path="signup" element={<Signup />} />
                      <Route path="*" element={<PageNotFound />} />
                    </Routes>
                  </CurrentRouteContextProvider>
                </FilesContextProvider>
              </FoldersContextProvider>
            </ShareContextProvider>
          </BrowserRouter>
        </ThemeContextProvider>
      </UserContextProvider>
    </>
  );
}

export default App;
