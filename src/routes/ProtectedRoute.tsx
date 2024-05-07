import { ReactNode } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../utils/contexts/auth";

const ProtectedRoute = ({ children }: { children?: ReactNode }) => {
  const { token } = useAuth();
  const { pathname } = useLocation();

  const authProtected = ["/login", "/register"];
  const protectedByToken = ["/profile", "/edit-profile", "/dashboard"];
  if (authProtected.includes(pathname)) {
    if (token) {
      return <Navigate to={"/"} />;
    }
  }
  if (protectedByToken.includes(pathname)) {
    if (!token) {
      return <Navigate to={"/login"} />;
    }
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
