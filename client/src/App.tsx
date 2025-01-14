import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import AppLayout from "./ui/AppLayout";
import Home from "./pages/Home";
import GlobalStyles from "./styles/GlobalStyles";
import Shared from "./pages/Shared";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PageNotFound from "./pages/PageNotFound";
import UserContextProvider from "./contexts/userContext";
import Folder from "./ui/Folder";
import MyFolders from "./pages/MyFolders";
import Folders from "./ui/Folders";

function App() {
  return (
    <>
      <UserContextProvider>
        <GlobalStyles />
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout />}>
              <Route index element={<Navigate replace to="all" />} />
              <Route path="all/*" element={<Home />}>
                <Route index element={<Folders />} />
                <Route path="folder/*" element={<Folder />} />
              </Route>

              <Route path="myFolders" element={<MyFolders />}>
                <Route index element={<Folders />} />
                <Route path="folder/:folderId" element={<Folder />} />
              </Route>

              <Route path="shared" element={<Shared />}>
                <Route index element={<Folders />} />
                <Route path="folder/:folderId" element={<Folder />} />
              </Route>
              {/* <Route path='file/:fileId' element={<File/>}/> */}
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </UserContextProvider>
    </>
  );
}

export default App;
