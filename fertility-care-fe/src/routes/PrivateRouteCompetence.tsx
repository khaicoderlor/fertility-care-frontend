import type { JSX } from "react";
import { Navigate } from "react-router-dom";
import { useCompetenceAuth } from "../contexts/CompetenceAuthContext";

const PrivateRouteCompetence = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useCompetenceAuth();

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRouteCompetence;