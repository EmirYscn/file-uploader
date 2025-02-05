import { useState, ReactNode } from "react";
import { useParams } from "react-router";

import { CurrentRouteContext } from "./currentRouteContext";

export function CurrentRouteContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [currentRoute, setCurrentRoute] = useState<string | null>("");
  const { id } = useParams();
  console.log(id);
  return (
    <CurrentRouteContext.Provider
      value={{
        currentRoute,
        setCurrentRoute,
      }}
    >
      {children}
    </CurrentRouteContext.Provider>
  );
}
