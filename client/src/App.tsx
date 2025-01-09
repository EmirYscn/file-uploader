import { useEffect, useState } from "react";

import type { User, File, Folder } from "./types/models";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [folders, setFolders] = useState<Folder[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchUsers() {
      try {
        setIsLoading(true);
        const res = await fetch("/api/users");
        const users: User[] = await res.json();
        setUsers(users);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    async function fetchFolders() {
      try {
        setIsLoading(true);
        const res = await fetch("/api/folders");
        const folders: Folder[] = await res.json();
        setFolders(folders);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchUsers();
    fetchFolders();
  }, []);

  return (
    <div>
      <h1>Users</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div>
            <ul>
              {users.map((user) => (
                <li key={user.id}>
                  <p>{user.email}</p>
                  <p>{user.username}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <ul>
              {files.map((file) => (
                <li key={file.id}>
                  <p>{file.name}</p>
                  <p>{file.size}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <ul>
              {folders.map((folder) => (
                <li key={folder.id}>
                  <p>{folder.name}</p>
                  <p>{folder.size}</p>
                  <p>{folder.createdAt.toString()}</p>
                  <p>{folder.fileCount}</p>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
