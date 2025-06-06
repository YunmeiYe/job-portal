import { JSX } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

interface PublicdRouteProps {
  children: JSX.Element;
}

const PublicRoute: React.FC<PublicdRouteProps> = ({ children }: PublicdRouteProps) => {
  const { isLoggedIn } = useSelector((state: any) => state.auth);
  if (isLoggedIn) {
    return <Navigate to="/" />
  }

  return children;
}

export default PublicRoute;