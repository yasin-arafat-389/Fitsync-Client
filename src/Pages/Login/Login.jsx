import Lottie from "lottie-react";
import loginAnimation from "../../Utilities/LottieAnimations/loginAnimation.json";
import { Button, Input } from "@material-tailwind/react";
import { FcGoogle } from "react-icons/fc";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";
import { useState } from "react";
import { ImSpinner9 } from "react-icons/im";
import { Helmet } from "react-helmet-async";
import axios from "axios";

const Login = () => {
  const [loading, setLoading] = useState(false);
  let location = useLocation();
  let { login, googleLogin, user } = useAuth();
  let navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  let handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    login(formData.email, formData.password)
      .then(() => {
        let userEmail = { email: formData.email };
        axios
          .post("https://fit-sync-server.vercel.app/access-token", userEmail)
          .then((res) => {
            if (res.data.token) {
              localStorage.setItem("access-token-from-fitsync", res.data.token);
              navigate(location?.state ? location?.state : "/");
              toast.success("Successfully Logged In!");
            }
          });
      })
      .catch((error) => {
        setLoading(false);
        if (error) {
          toast.error("Invalid Email or Password");
        }
      });
  };

  let handleGoogleLogin = () => {
    googleLogin()
      .then((result) => {
        const userInfo = {
          name: result.user?.displayName,
          email: result.user?.email,
          role: "member",
        };
        axios.post("https://fit-sync-server.vercel.app/users", userInfo).then();

        let userEmail = { email: result.user?.email };

        axios
          .post("https://fit-sync-server.vercel.app/access-token", userEmail)
          .then((res) => {
            if (res.data.token) {
              localStorage.setItem("access-token-from-fitsync", res.data.token);
              navigate(location?.state ? location?.state : "/");
              toast.success("Successfully Logged In!");
            }
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <Helmet>
        <title>FitSync | Login</title>
      </Helmet>
      <div>
        <div className="bg-[#AAB99A]">
          <div className="py-10">
            <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl">
              <div className="hidden bg-gray-100 lg:flex lg:w-1/2">
                <Lottie animationData={loginAnimation} loop={true} />
              </div>

              <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
                <div className="flex justify-center mx-auto">
                  <img
                    className="w-[60%]"
                    src="https://i.ibb.co/q7L0zZ5/fit-Sync-prev-ui.png"
                    alt=""
                  />
                </div>

                <p className="mt-3 text-xl text-center text-gray-600 dark:text-gray-200">
                  Sign In to your account
                </p>

                <Button
                  onClick={handleGoogleLogin}
                  size="lg"
                  fullWidth
                  variant="outlined"
                  color="blue-gray"
                  className="flex items-center justify-center gap-3 mx-auto mt-4"
                >
                  <FcGoogle fontSize={"25px"} />
                  Sign In with Google
                </Button>

                <div className="flex items-center justify-between mt-4">
                  <span className="w-1/5 h-[1px] bg-gray-500 lg:w-1/4"></span>

                  <div className="text-xs text-center text-gray-600 uppercase dark:text-gray-600">
                    or Sign In with email
                  </div>

                  <span className="w-1/5 h-[1px] bg-gray-500 lg:w-1/4"></span>
                </div>

                <div className="flex gap-3 justify-around mt-4">
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({
                        email: "admin@gmail.com",
                        password: "Arafat*",
                      })
                    }
                    className="px-4 py-2 text-xs font-semibold text-white bg-gray-700 rounded-lg hover:bg-gray-800"
                  >
                    Admin Credentials
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({
                        email: "arafat@gmail.com",
                        password: "Arafat*",
                      })
                    }
                    className="px-4 py-2 text-xs font-semibold text-white bg-gray-700 rounded-lg hover:bg-gray-800"
                  >
                    Member Credentials
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({
                        email: "aliison@gmail.com",
                        password: "Arafat*",
                      })
                    }
                    className="px-4 py-2 text-xs font-semibold text-white bg-gray-700 rounded-lg hover:bg-gray-800"
                  >
                    Trainer Credentials
                  </button>
                </div>

                <form onSubmit={handleLogin}>
                  <div className="mt-4">
                    <Input
                      value={formData.email}
                      onChange={handleInputChange}
                      color="blue"
                      name="email"
                      label="Enter your email"
                      type="email"
                      required
                    />
                  </div>
                  <div className="mt-4">
                    <Input
                      value={formData.password}
                      onChange={handleInputChange}
                      color="blue"
                      name="password"
                      label="Enter password"
                      type="password"
                      required
                    />
                  </div>

                  <div className="mt-6">
                    <button
                      className={`w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50 flex justify-center`}
                      type="submit"
                      disabled={loading ? true : false}
                    >
                      {loading ? (
                        <div className="flex items-center justify-center gap-4">
                          <ImSpinner9 className="animate-spin text-[20px]" />
                          Signing In
                        </div>
                      ) : (
                        "Sign In"
                      )}
                    </button>
                  </div>
                </form>

                <div className="flex items-center justify-center text-center py-4">
                  <span className="text-sm text-gray-900 dark:text-gray-200">
                    {`Don't`} have an account?
                  </span>

                  <Link
                    to="/sign-up"
                    className="mx-2 text-sm font-bold text-blue-500 dark:text-blue-400 hover:underline"
                  >
                    Sign Up
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
