/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import useAuth from "../Hooks/useAuth";
import RouteChangeLoader from "../Utilities/RouteChangeLoader/RouteChangeLoader";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <RouteChangeLoader />;
  }

  if (!user) {
    toast.error("You must login first");
    return <Navigate state={location.pathname} to="/sign-in" />;
  }

  return <div>{children}</div>;
};

export default PrivateRoute;
