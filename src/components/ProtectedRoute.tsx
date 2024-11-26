import { Navigate } from "react-router-dom";
import { ReactNode } from "react";

export const ProtectedRoute = ({
  isAuthenticated,
  children,
}: {
  isAuthenticated: boolean;
  children: ReactNode;
}) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return children;
};
