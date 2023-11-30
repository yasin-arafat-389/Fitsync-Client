import toast from "react-hot-toast";
import PageTitle from "../../Components/PageTitle/PageTitle";
import useAuth from "../../Hooks/useAuth";
import useAxios from "../../Hooks/useAxios";
import { Navigate, useNavigate } from "react-router-dom";
import "./Pricing.css";
import { Chip, Dialog, Typography } from "@material-tailwind/react";
import Swal from "sweetalert2";
import { useState } from "react";
import useRole from "../../Hooks/useRole";
import Payment from "../../Components/Payment/Payment";
import { Helmet } from "react-helmet-async";

const Pricing = () => {
  let { user } = useAuth();
  let axios = useAxios();
  let navigate = useNavigate();
  let [role] = useRole();

  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);

  let name = user?.displayName;

  let dataFromLS = JSON.parse(localStorage.getItem(user?.email));

  let trainer;
  let slot;
  let trainerEmail;

  if (dataFromLS) {
    trainer = dataFromLS[0];
    slot = dataFromLS[1];
    trainerEmail = dataFromLS[2];
  }

  let handleOpen = () => {
    setOpen(!open);
  };
  let handleOpen2 = () => {
    setOpen2(!open2);
  };
  let handleOpen3 = () => {
    setOpen3(!open3);
  };

  let saveToDB1 = () => {
    let pkg = "Silver";
    let price = "200";
    let storeToDB = {
      trainer,
      slot,
      pkg,
      price,
      name,
      email: user?.email,
      photo: user?.photoURL || "https://i.ibb.co/HN9NtYY/user.png",
      trainerEmail,
    };
    axios.post("/package/subscribed", storeToDB).then(() => {
      toast.success("Successfully Joined");

      navigate("/activity-log");
      localStorage.removeItem(user?.email);
    });
  };

  let saveToDB2 = () => {
    let pkg = "Gold";
    let price = "800";
    let storeToDB = {
      trainer,
      slot,
      pkg,
      price,
      name,
      email: user?.email,
      photo: user?.photoURL || "https://i.ibb.co/HN9NtYY/user.png",
      trainerEmail,
    };
    axios.post("/package/subscribed", storeToDB).then(() => {
      toast.success("Successfully Joined");

      navigate("/activity-log");
      localStorage.removeItem(user?.email);
    });
  };

  let saveToDB3 = () => {
    let pkg = "Diamond";
    let price = "400";
    let storeToDB = {
      trainer,
      slot,
      pkg,
      price,
      name,
      email: user?.email,
      photo: user?.photoURL || "https://i.ibb.co/HN9NtYY/user.png",
      trainerEmail,
    };
    axios.post("/package/subscribed", storeToDB).then(() => {
      toast.success("Successfully Joined");

      navigate("/activity-log");
      localStorage.removeItem(user?.email);
    });
  };

  let handleRemove = () => {
    Swal.fire({
      title: `Are you sure you want to remove ${trainer}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Remove",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem(user?.email);
        toast.success(`${trainer} has been removed`);
        navigate("/trainer");
      }
    });
  };

  if (!dataFromLS) {
    return <Navigate to="/" />;
  }

  if (role === "trainer" || role === "admin") {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <Helmet>
        <title>FitSync | Pricing</title>
      </Helmet>
      <div>
        <PageTitle title="Pricing" from="Trainer" link="/trainer" />

        {/* Selected Trainer Info */}
        <div className="trainer-card flex">
          <div className="w-4/5">
            <div className="flex gap-2">
              <h1 className="text-white font-bold">Your selected trainer:</h1>
              <h1 className="text-yellow-600 font-bold">{dataFromLS[0]}</h1>
            </div>

            <div className="flex items-center gap-2 mt-5">
              <h1 className="text-white font-bold">Your selected time slot:</h1>
              <h1 className="text-yellow-600 font-bold">
                <Chip
                  color="green"
                  value={dataFromLS[1]}
                  className="text-[16px] capitalize"
                />
              </h1>
            </div>
          </div>

          <button type="button" className="close w-1/5" onClick={handleRemove}>
            <svg
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>

        <div className=" py-16">
          <div className="grid lg:grid-cols-3 md:grid-cols-1 justify-items-center px-8 gap-10 md:gap-10 lg:gap-0 text-zinc-800 ">
            <div className="flex flex-col items-center bg-[#F1F5F9] p-8 rounded-lg shadow-lg max-w-sm">
              <div>
                <h2 className="font-extrabold text-3xl text-center mb-2">
                  Silver
                </h2>
                <p className="opacity-60 text-center">
                  For weight loss programs
                </p>
                <div className="flex flex-col items-center my-8">
                  <p className="font-extrabold text-4xl">$200</p>
                  <p className="text-sm opacity-60">/Month</p>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <p className="flex items-center text-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="w-4 h-4 mr-2"
                  >
                    <path
                      fillRule="evenodd"
                      d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <b>Access to gym facilities during standard hours</b>
                </p>
                <p className="flex items-center text-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="w-4 h-4 mr-2"
                  >
                    <path
                      fillRule="evenodd"
                      d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <b>Basic fitness classes</b>
                </p>
                <p className="flex items-center text-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="w-4 h-4 mr-2"
                  >
                    <path
                      fillRule="evenodd"
                      d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <b>Limited access to advanced classes</b>
                </p>
                <p className="flex items-center text-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="w-4 h-4 mr-2"
                  >
                    <path
                      fillRule="evenodd"
                      d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <b>General workout plans</b>
                </p>

                <div className="flex justify-center mt-8 ">
                  <button
                    className=" px-4 py-2 border-blue-400 border-4 hover:bg-violet-100 rounded-xl"
                    onClick={handleOpen}
                  >
                    Join Now
                  </button>
                </div>
                <Dialog open={open} handler={handleOpen}>
                  <div className="flex justify-center items-center my-5">
                    <Typography variant="h5" color="blue-gray">
                      Please pay by card (Visa, Mastercard etc..)
                    </Typography>
                  </div>

                  <div className="flex flex-col justify-center items-center gap-2">
                    <h1 className="text-[18px] font-bold text-gray-700">
                      Package Name:{" "}
                      <span className="text-blue-500">Silver</span>
                    </h1>
                    <h1 className="text-[18px] font-bold text-gray-700">
                      Price: <span className="text-blue-500">$200</span>
                    </h1>
                    <h1 className="text-[18px] font-bold text-gray-700">
                      Slot: <span className="text-blue-500">{slot}</span>
                    </h1>
                    <h1 className="text-[18px] font-bold text-gray-700">
                      Trainer: <span className="text-blue-500">{trainer}</span>
                    </h1>
                  </div>

                  <div className="p-5 w-full">
                    <Payment func={saveToDB1} ho={handleOpen} />
                  </div>
                </Dialog>
              </div>
            </div>

            <div className="flex flex-col items-center bg-gradient-to-br from-blue-100 via-orange-100 to-purple-100 p-8 rounded-lg shadow-lg relative border-8 border-orange-200 max-w-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                className="w-20 h-20 absolute -top-11 -left-11 fill-red-400"
              >
                <path
                  fillRule="evenodd"
                  d="M12.963 2.286a.75.75 0 00-1.071-.136 9.742 9.742 0 00-3.539 6.177A7.547 7.547 0 016.648 6.61a.75.75 0 00-1.152-.082A9 9 0 1015.68 4.534a7.46 7.46 0 01-2.717-2.248zM15.75 14.25a3.75 3.75 0 11-7.313-1.172c.628.465 1.35.81 2.133 1a5.99 5.99 0 011.925-3.545 3.75 3.75 0 013.255 3.717z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <p className="mono text-sm absolute -top-4 bg-red-400 text-white py-0.5 px-2 font-bold tracking-wider rounded">
                POPULAR
              </p>
              <div>
                <div className="flex gap-4 justify-center">
                  <p className="font-extrabold text-3xl mb-2">Gold</p>
                </div>
                <p className="opacity-60 text-center">
                  For Body Building And Bulk Up
                </p>
                <p className="opacity-60 text-center"></p>
                <div className="flex gap-4 justify-center">
                  <div className="flex flex-col items-center my-8">
                    <p className="font-extrabold text-4xl">$800</p>
                    <p className="text-sm opacity-60">/Month</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <p className="flex items-center text-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="w-4 h-4 mr-2"
                  >
                    <path
                      fillRule="evenodd"
                      d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <b>24/7 access to gym facilities</b>
                </p>
                <p className="flex items-center text-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="w-4 h-4 mr-2"
                  >
                    <path
                      fillRule="evenodd"
                      d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <b>Full access to all fitness classes</b>
                </p>
                <p className="flex items-center text-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="w-4 h-4 mr-2"
                  >
                    <path
                      fillRule="evenodd"
                      d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <b>Priority booking for popular classes</b>
                </p>
                <p className="flex items-center text-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="w-4 h-4 mr-2"
                  >
                    <path
                      fillRule="evenodd"
                      d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <b>Access to advanced gym equipment</b>
                </p>
                <div className="flex justify-center mt-8">
                  <button
                    className=" px-4 py-2 border-blue-400 border-4 hover:bg-violet-100 rounded-xl"
                    onClick={handleOpen2}
                  >
                    Join Now
                  </button>
                </div>
                <Dialog open={open2} handler={handleOpen2}>
                  <div className="flex justify-center items-center my-5">
                    <Typography variant="h5" color="blue-gray">
                      Please pay by card (Visa, Mastercard etc..)
                    </Typography>
                  </div>

                  <div className="flex flex-col justify-center items-center gap-2">
                    <h1 className="text-[18px] font-bold text-gray-700">
                      Package Name: <span className="text-blue-500">Gold</span>
                    </h1>
                    <h1 className="text-[18px] font-bold text-gray-700">
                      Price: <span className="text-blue-500">$800</span>
                    </h1>
                    <h1 className="text-[18px] font-bold text-gray-700">
                      Slot: <span className="text-blue-500">{slot}</span>
                    </h1>
                    <h1 className="text-[18px] font-bold text-gray-700">
                      Trainer: <span className="text-blue-500">{trainer}</span>
                    </h1>
                  </div>

                  <div className="p-5 w-full">
                    <Payment func={saveToDB2} ho={handleOpen2} />
                  </div>
                </Dialog>
              </div>
            </div>

            <div className="flex flex-col items-center bg-[#F1F5F9]  p-8 rounded-lg shadow-lg max-w-sm">
              <div>
                <h2 className="font-extrabold text-3xl text-center mb-2">
                  Diamond
                </h2>
                <p className="opacity-60 text-center">
                  For enterprise level events
                </p>
                <div className="flex flex-col items-center my-8">
                  <p className="font-extrabold text-4xl">$400</p>
                  <p className="text-sm opacity-60">/Month</p>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <p className="flex items-center text-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="w-4 h-4 mr-2"
                  >
                    <path
                      fillRule="evenodd"
                      d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <b>VIP locker room access</b>
                </p>
                <p className="flex items-center text-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="w-4 h-4 mr-2"
                  >
                    <path
                      fillRule="evenodd"
                      d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <b>Priority booking for personal training</b>
                </p>
                <p className="flex items-center text-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="w-4 h-4 mr-2"
                  >
                    <path
                      fillRule="evenodd"
                      d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <b>Complimentary fitness assessments</b>
                </p>
                <p className="flex items-center text-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="w-4 h-4 mr-2"
                  >
                    <path
                      fillRule="evenodd"
                      d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <b>Unlimited access to personal training sessions</b>
                </p>
                <div className="flex justify-center mt-8 ">
                  <button
                    className=" px-4 py-2 border-blue-400 border-4 hover:bg-violet-100 rounded-xl"
                    onClick={handleOpen3}
                  >
                    Join Now
                  </button>
                  <Dialog open={open3} handler={handleOpen3}>
                    <div className="flex justify-center items-center my-5">
                      <Typography variant="h5" color="blue-gray">
                        Please pay by card (Visa, Mastercard etc..)
                      </Typography>
                    </div>

                    <div className="flex flex-col justify-center items-center gap-2">
                      <h1 className="text-[18px] font-bold text-gray-700">
                        Package Name:{" "}
                        <span className="text-blue-500">Diamond</span>
                      </h1>
                      <h1 className="text-[18px] font-bold text-gray-700">
                        Price: <span className="text-blue-500">$400</span>
                      </h1>
                      <h1 className="text-[18px] font-bold text-gray-700">
                        Slot: <span className="text-blue-500">{slot}</span>
                      </h1>
                      <h1 className="text-[18px] font-bold text-gray-700">
                        Trainer:{" "}
                        <span className="text-blue-500">{trainer}</span>
                      </h1>
                    </div>

                    <div className="p-5 w-full">
                      <Payment func={saveToDB3} ho={handleOpen3} />
                    </div>
                  </Dialog>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
