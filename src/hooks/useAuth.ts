import { useContext } from "react";
import { AuthContext } from "../authWrapper/AuthContext";
import { toast } from "react-toastify";

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    toast.error(`AuthContext not found`);
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
