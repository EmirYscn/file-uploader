import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import GlobalStyles from "./styles/GlobalStyles";

import Home from "./pages/Home";
import SharedPage from "./pages/SharedPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PageNotFound from "./pages/PageNotFound";
import MyFolders from "./pages/MyFolders";

import AppLayout from "./ui/AppLayout";
import All from "./ui/All";
import Own from "./ui/Own";
import Shared from "./ui/Shared";
import SharedLink from "./ui/SharedLink";

import FoldersContextProvider from "./contexts/foldersContextProvider";
import FilesContextProvider from "./contexts/filesContextProvider";
import ThemeContextProvider from "./contexts/themeContextProvider";
import { ShareContextProvider } from "./contexts/shareContextProvider";
import { CurrentRouteContextProvider } from "./contexts/currentRouteContextProvider";
import ProfileLayout from "./ui/ProfileLayout";
import Profile from "./pages/Profile";
import Password from "./pages/Password";

import ProtectedRoute from "./ui/ProtectedRoute";
import { useContext } from "react";
import { AuthContext } from "./contexts/authContext";

function App() {
  const { auth } = useContext(AuthContext);

  return (
    <>
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

                      <Route
                        path="all/*"
                        element={
                          <ProtectedRoute
                            isAuthenticated={auth.isAuthenticated}
                          >
                            <Home />
                          </ProtectedRoute>
                        }
                      >
                        <Route index element={<All />} />
                        <Route path="folder/:folderId" element={<All />} />
                      </Route>

                      <Route
                        path="myFolders/*"
                        element={
                          <ProtectedRoute
                            isAuthenticated={auth.isAuthenticated}
                          >
                            <MyFolders />
                          </ProtectedRoute>
                        }
                      >
                        <Route index element={<Own />} />
                        <Route path="folder/:folderId" element={<Own />} />
                      </Route>

                      <Route
                        path="shared/*"
                        element={
                          <ProtectedRoute
                            isAuthenticated={auth.isAuthenticated}
                          >
                            <SharedPage />
                          </ProtectedRoute>
                        }
                      >
                        <Route index element={<Shared />} />
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
                    </Route>

                    <Route
                      path="profile"
                      element={
                        <ProtectedRoute isAuthenticated={auth.isAuthenticated}>
                          <ProfileLayout />
                        </ProtectedRoute>
                      }
                    >
                      <Route index element={<Profile />} />
                      <Route path="password" element={<Password />} />
                      {/* <Route path="settings" element={<Settings />} /> */}
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
    </>
  );
}

export default App;
