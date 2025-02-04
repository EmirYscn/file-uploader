import { useState, ReactNode, useContext } from "react";
import { CurrentRouteContext } from "./currentRouteContext";
import { useParams } from "react-router";

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

// export function useCurrentRoute() {
//   return useContext(CurrentRouteContext);
// }
