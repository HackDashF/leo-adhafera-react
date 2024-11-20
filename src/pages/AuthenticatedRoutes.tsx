import { Navigate, Outlet } from "react-router-dom";

const AuthenticatedRoutes = () => {
  const isAuthenticated = true; // need to check for JWT here
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default AuthenticatedRoutes;
