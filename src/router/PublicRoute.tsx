import { JSX } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

interface PublicdRouteProps {
  children: JSX.Element;
}

const PublicRoute: React.FC<PublicdRouteProps> = ({ children }: PublicdRouteProps) => {
  const token = useSelector((state: any) => state.auth.accessToken);
  if (token) {
    return <Navigate to="/" />
  }

  return children;
}

export default PublicRoute;