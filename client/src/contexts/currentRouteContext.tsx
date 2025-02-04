import { createContext } from "react";

export type CurrentRouteContext = {
  currentRoute: string | null;
  setCurrentRoute: React.Dispatch<React.SetStateAction<string | null>>;
};

export const CurrentRouteContext = createContext<CurrentRouteContext>({
  currentRoute: "Main",
  setCurrentRoute: () => {},
});
