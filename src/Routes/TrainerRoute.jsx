/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import useRole from "../Hooks/useRole";

const TrainerRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [role, isLoading] = useRole();

  if (loading || isLoading) {
    return <div>Loading</div>;
  }

  if (user && role === "trainer") {
    return children;
  }

  return <Navigate state={location.pathname} to="/" />;
};

export default TrainerRoute;
