import { createContext } from "react";
import { User } from "../types/models";

export type Auth = {
  isAuthenticated: boolean;
  user: User | null;
};

type AuthContextType = {
  auth: Auth;
  setAuth: React.Dispatch<React.SetStateAction<Auth>>;
  refreshAuth: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>({
  auth: { isAuthenticated: false, user: null },
  setAuth: () => {},
  refreshAuth: async () => {},
});
