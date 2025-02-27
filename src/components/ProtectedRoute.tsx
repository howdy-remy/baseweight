import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import { useAuth } from "contexts/Authentication";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { session } = useAuth();

  if (!session) {
    return <Navigate to="/login" />;
  }
  return children;
};
