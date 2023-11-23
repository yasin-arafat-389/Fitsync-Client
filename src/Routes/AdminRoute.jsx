/* eslint-disable react/prop-types */
import useAuth from "../Hooks/useAuth";
import { Navigate } from "react-router-dom";
import useRole from "../Hooks/useRole";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [role, isLoading] = useRole();

  if (loading || isLoading) {
    return <div>Loading</div>;
  }

  if (user && role === "admin") {
    return children;
  }

  return <Navigate state={location.pathname} to="/" />;
};

export default AdminRoute;
