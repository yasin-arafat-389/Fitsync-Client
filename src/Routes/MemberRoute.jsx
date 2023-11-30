/* eslint-disable react/prop-types */
import DashboardLoader from "../Utilities/DashboardLoader/DashboardLoader";
import useAuth from "../Hooks/useAuth";
import useRole from "../Hooks/useRole";
import { Navigate } from "react-router-dom";

const MemberRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [role, isLoading] = useRole();

  if (loading || isLoading) {
    return <DashboardLoader />;
  }

  if (user && role === "member") {
    return children;
  }

  return <Navigate state={location.pathname} to="/" />;
};

export default MemberRoute;
