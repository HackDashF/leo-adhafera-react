import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const AuthenticatedRoutes = () => {
  const { user, tokens } = useContext(AuthContext);
  const isAuthenticated = user && tokens;
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default AuthenticatedRoutes;
