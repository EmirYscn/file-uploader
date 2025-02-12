import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "react-tooltip/dist/react-tooltip.css";
import App from "./App.tsx";
import AuthContextProvider from "./contexts/authContextProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </StrictMode>
);
