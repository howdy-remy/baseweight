import { Navigate, useNavigate } from "react-router-dom";
import { ReactNode } from "react";
import { useAuth } from "contexts/Authentication";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { session } = useAuth();
  const navigate = useNavigate();

  if (!session) {
    navigate("/login");
  }

  return children;
};
