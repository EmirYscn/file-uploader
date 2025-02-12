import { useEffect, useState } from "react";
import { Auth, AuthContext } from "./authContext";
import Spinner from "../ui/Spinner";

type UserContextProviderProps = {
  children: React.ReactNode;
};

function AuthContextProvider({ children }: UserContextProviderProps) {
  const [auth, setAuth] = useState<Auth>({
    isAuthenticated: false,
    user: null,
  });
  const [isLoading, setIsLoading] = useState(true);

  const verifyAuth = async () => {
    // if (auth.isAuthenticated) return;
    try {
      setIsLoading(true);
      const response = await fetch("/api/auth/verify", {
        credentials: "include",
      });
      const data = await response.json();
      setAuth(data);
    } catch (error) {
      console.error("Auth verification failed:", error);
      setAuth({ isAuthenticated: false, user: null }); // Ensure logout on failure
    } finally {
      setIsLoading(false); // End loading
    }
  };

  useEffect(() => {
    verifyAuth();
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <AuthContext.Provider value={{ auth, setAuth, refreshAuth: verifyAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
