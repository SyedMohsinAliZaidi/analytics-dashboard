import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface Props {
  children: ReactNode;
}

const PrivateRoute = ({ children }: Props) => {
  const token = localStorage.getItem("token");
  return token ? <>{children}</> : <Navigate to="/" />;
};

export default PrivateRoute;