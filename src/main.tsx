import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AppRoutes from "./routes.tsx";
import { AuthProvider } from "./authWrapper/AuthContext.tsx";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* <App /> */}
    <AuthProvider>
      <AppRoutes />
      <ToastContainer />
    </AuthProvider>
  </StrictMode>
);
