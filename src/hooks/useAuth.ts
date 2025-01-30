import { useContext } from "react";
import { AuthContext } from "../authWrapper/AuthContext";

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    console.log("AuthContext not found");
    // throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
