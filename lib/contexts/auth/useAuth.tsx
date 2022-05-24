import { AuthContext } from "./authContext";
import { useContext } from "react";

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthContext.Provider");
  }

  return context;
};
