/* eslint-disable react/prop-types */
import useAuth from "../Hooks/useAuth";
import { Navigate } from "react-router-dom";
import useRole from "../Hooks/useRole";
import DashboardLoader from "../Utilities/DashboardLoader/DashboardLoader";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [role, isLoading] = useRole();

  if (loading || isLoading) {
    return <DashboardLoader />;
  }

  if (user && role === "admin") {
    return children;
  }

  return <Navigate state={location.pathname} to="/" />;
};

export default AdminRoute;
