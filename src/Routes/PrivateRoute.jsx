/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import useAuth from "../Hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading</div>;
  }

  if (!user) {
    toast.error("You must login first");
    return <Navigate state={location.pathname} to="/sign-in" />;
  }

  return <div>{children}</div>;
};

export default PrivateRoute;
