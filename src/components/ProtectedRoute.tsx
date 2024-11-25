import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/Authentication";
import { ReactNode } from "react";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { session } = useAuth();
  if (!session) {
    return <Navigate to="/login" />;
  }
  return children;
};
