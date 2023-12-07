import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: "https://fit-sync-server.vercel.app",
  withCredentials: true,
});

const useAxios = () => {
  let { logOut } = useAuth();
  const navigate = useNavigate();

  axiosSecure.interceptors.request.use(
    function (config) {
      const token = localStorage.getItem("access-token-from-fitsync");
      config.headers.authorization = `Bearer ${token}`;
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  axiosSecure.interceptors.response.use(
    function (response) {
      return response;
    },
    async (error) => {
      const status = error.response.status;
      if (status === 401 || status === 403) {
        await logOut();
        toast.error("Something went wrong. Please Login Again");
        navigate("/sign-in");
      }
      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxios;
