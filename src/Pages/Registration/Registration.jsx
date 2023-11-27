import { Input } from "@material-tailwind/react";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";
import { ImSpinner9 } from "react-icons/im";
import { imageUpload } from "../../Utilities/ImageUpload/ImageUpload";
import useAxios from "../../Hooks/useAxios";

const Registration = () => {
  const [loading, setLoading] = useState(false);
  let { createUser, update, logOut, user } = useAuth();
  let navigate = useNavigate();
  let axios = useAxios();

  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleRegister = async (e) => {
    setLoading(true);
    e.preventDefault();

    let form = e.target;
    let name = form.name.value;
    let email = form.email.value;
    let password = form.password.value;
    let image = form.image.files[0];

    const passRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}|:;<>,.?/~`])(.{6,})$/;
    const validPassword = passRegex.test(password);

    if (!validPassword) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Password must be at least 6 characters long, containing at least one upper case and special character",
      });
      setLoading(false);
      return;
    }

    let imgData = null;

    if (selectedFile) {
      let imageData = await imageUpload(image);
      imgData = imageData;
    }

    createUser(email, password)
      .then(() => {
        update(name, imgData?.data?.display_url)
          .then(() => {})
          .catch((error) => {
            console.log(error);
          });

        const userInfo = {
          email: email,
          name: name,
          role: "member",
        };

        axios.post("/users", userInfo).then();

        logOut()
          .then(() => {
            toast.success(`Registration Successfull!!`);
            navigate("/sign-in");
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch(() => {
        toast.error(`User Already Exists`);
        setLoading(false);
      });
  };

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <div className="bg-[#E1BFB8]">
        <div className="py-20">
          <div className=" w-full max-w-sm mx-auto overflow-hidden rounded-lg shadow-md dark:bg-gray-800 bg-white">
            <div className="px-6 py-4">
              <div className="flex justify-center mx-auto">
                <img
                  className="w-[60%]"
                  src="https://i.ibb.co/q7L0zZ5/fit-Sync-prev-ui.png"
                  alt=""
                />
              </div>

              <h3 className="mt-3 text-2xl font-medium text-center text-[#000]">
                Sign Up
              </h3>

              <p className="mt-1 text-center text-[#000] ">
                Sign Up to join our community
              </p>

              <form onSubmit={handleRegister} id="regForm">
                <div className="w-full mt-4">
                  <Input
                    color="blue"
                    label="Enter your Name"
                    name="name"
                    required
                  />
                </div>

                <div className="w-full mt-4">
                  <Input
                    color="blue"
                    label="Enter your email"
                    name="email"
                    type="email"
                    required
                  />
                </div>

                <div className="w-full mt-4">
                  <Input
                    color="blue"
                    label="Enter a password"
                    name="password"
                    type="password"
                    required
                  />
                </div>

                <div className="w-full mt-4">
                  <div>
                    <label className="flex gap-4 p-2 cursor-pointer border-2 border-gray-400 rounded-lg shadow-xl justify-center items-center">
                      <svg
                        className="w-8 h-8"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                      </svg>
                      <span className="text-base font-medium  elipsis elipse">
                        {selectedFile
                          ? selectedFile.name
                          : "Select profile picture"}
                      </span>
                      <input
                        type="file"
                        className="hidden"
                        onChange={handleFileChange}
                        id="image"
                        name="image"
                        accept="image/*"
                      />
                    </label>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <button
                    className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                    disabled={loading ? true : false}
                  >
                    {loading ? (
                      <div className="flex items-center justify-center gap-4">
                        <ImSpinner9 className="animate-spin text-[20px]" />
                        Signing Up
                      </div>
                    ) : (
                      "Sign Up"
                    )}
                  </button>
                </div>
              </form>
              <div className="flex items-center justify-center text-center py-4">
                <span className="text-sm text-gray-900 dark:text-gray-200">
                  Already have an account?
                </span>

                <Link
                  to="/sign-in"
                  className="mx-2 text-sm font-bold text-blue-500 dark:text-blue-400 hover:underline"
                >
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
