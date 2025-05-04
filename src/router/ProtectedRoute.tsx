import { jwtDecode } from "jwt-decode";
import { JSX } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getItem } from "../utils/localStorage";

interface ProtectedRouteProps {
  children: JSX.Element;
  allowedRoles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { isLoggedIn } = useSelector((state: any) => state.auth);
  const token = getItem("accessToken");
  const decoded: any = jwtDecode(token);

  if (!isLoggedIn) {
    return <Navigate to="/login" />
  }

  if (allowedRoles && !allowedRoles.includes(decoded.accountType)) {
    return <Navigate to="/unauthorized" />
  }
  
  return children;
}

export default ProtectedRoute;