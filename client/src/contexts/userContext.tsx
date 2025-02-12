import { createContext, useEffect, useState } from "react";

import { User } from "../types/models";

type UserContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

type UserContextProviderProps = {
  children: React.ReactNode;
};

export const UserContext = createContext({} as UserContextType);

function UserContextProvider({ children }: UserContextProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function fetchCurrentUser() {
      try {
        const response = await fetch("/api/auth/current-user", {
          method: "GET",
          credentials: "include",
        });
        if (response.ok) {
          const user: User = await response.json();
          setUser(user);
        }
      } catch (error) {
        console.log("Not authenticated", error);
      }
    }
    fetchCurrentUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
