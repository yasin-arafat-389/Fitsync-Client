import { Link } from "react-router-dom";
import PageTitle from "../../Components/PageTitle/PageTitle";
import "./Trainer.css";
import useAxios from "../../Hooks/useAxios";
import useAuth from "../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import RouteChangeLoader from "../../Utilities/RouteChangeLoader/RouteChangeLoader";
import { Button } from "@material-tailwind/react";
import useRole from "../../Hooks/useRole";
import { Helmet } from "react-helmet-async";

const Trainer = () => {
  let axios = useAxios();
  let { user } = useAuth();
  let [role] = useRole();

  let { data = [] } = useQuery({
    queryKey: ["trainer", user?.email],
    queryFn: async () => {
      let res = await axios.get(`/trainers?email=${user?.email}`).then();
      return res.data;
    },
  });

  let handleAlert = () => {
    if (data.status === "requested") {
      Swal.fire({
        title: "You have already applied to become a trainer",
        text: "Please await admin approval",
        icon: "warning",
      });
    }

    if (data.status === "rejected") {
      Swal.fire({
        title: "Ooopsss",
        text: "Admin rejected your request",
        icon: "warning",
      });
    }
  };

  let { data: trainers, isLoading } = useQuery({
    queryKey: ["allTrainers"],
    queryFn: async () => {
      let res = await axios.get(`/all-trainers`).then();
      return res.data;
    },
  });

  if (isLoading) {
    return <RouteChangeLoader />;
  }

  return (
    <div>
      <Helmet>
        <title>FitSync | Trainer</title>
      </Helmet>
      <PageTitle title="Trainer" />

      <div>
        <div className="my-[100px]">
          <div className="mx-auto max-w-screen-xl px-4 md:px-8">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
              {trainers.map((item, index) => (
                <div
                  className="flex flex-col items-center rounded-lg bg-gray-100 p-4 lg:p-8"
                  key={index}
                >
                  <div className="mb-2 h-24 w-24 overflow-hidden rounded-full bg-gray-200 shadow-lg md:mb-4 md:h-32 md:w-32">
                    <img
                      src={item.image || "https://i.ibb.co/HN9NtYY/user.png"}
                      loading="lazy"
                      alt="Photo by Radu Florin"
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <div>
                    <div className="text-center font-bold text-indigo-500 md:text-lg">
                      {item.name}
                    </div>
                    <p className="text-center text-sm text-gray-600 md:text-base">
                      Trainer
                    </p>

                    <p className=" text-center text-sm text-gray-600 md:text-base">
                      Years of experience: {item.experience}
                    </p>

                    <p className="mb-2 text-center text-sm text-gray-600 md:text-base">
                      Available: {item.availableDays.length} days a week
                    </p>

                    <div className="flex justify-center">
                      <div className="flex gap-4">
                        <a
                          target="_blank"
                          className="text-gray-400 transition duration-100 hover:text-gray-500 active:text-gray-600"
                        >
                          <svg
                            className="h-5 w-5"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                          </svg>
                        </a>

                        <a
                          target="_blank"
                          className="text-gray-400 transition duration-100 hover:text-gray-500 active:text-gray-600"
                        >
                          <svg
                            className="h-5 w-5"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                          </svg>
                        </a>
                      </div>
                    </div>

                    <div
                      className={`flex justify-center items-center mt-5  ${
                        role === "trainer" || role === "admin" ? "hidden" : ""
                      }`}
                    >
                      <Link to={`/trainer/details/${item._id}`}>
                        <Button size="sm" className="capitalize bg-[#0866ff]">
                          Know More
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Be a trainer button */}
          <div
            className={`mt-16 flex justify-center items-center ${
              data.status === "accepted" || role === "admin" ? "hidden" : ""
            }`}
          >
            {data.status === "requested" || data.status === "rejected" ? (
              <button className="beTrainer" onClick={handleAlert}>
                <span className="font-bold text-[18px]">Become A Trainer</span>
                <svg
                  width="34"
                  height="34"
                  viewBox="0 0 74 74"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="37"
                    cy="37"
                    r="35.5"
                    stroke="black"
                    strokeWidth="3"
                  ></circle>
                  <path
                    d="M25 35.5C24.1716 35.5 23.5 36.1716 23.5 37C23.5 37.8284 24.1716 38.5 25 38.5V35.5ZM49.0607 38.0607C49.6464 37.4749 49.6464 36.5251 49.0607 35.9393L39.5147 26.3934C38.9289 25.8076 37.9792 25.8076 37.3934 26.3934C36.8076 26.9792 36.8076 27.9289 37.3934 28.5147L45.8787 37L37.3934 45.4853C36.8076 46.0711 36.8076 47.0208 37.3934 47.6066C37.9792 48.1924 38.9289 48.1924 39.5147 47.6066L49.0607 38.0607ZM25 38.5L48 38.5V35.5L25 35.5V38.5Z"
                    fill="black"
                  ></path>
                </svg>
              </button>
            ) : (
              <Link to="/become-trainer">
                <button className="beTrainer">
                  <span className="font-bold text-[18px]">
                    Become A Trainer
                  </span>
                  <svg
                    width="34"
                    height="34"
                    viewBox="0 0 74 74"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="37"
                      cy="37"
                      r="35.5"
                      stroke="black"
                      strokeWidth="3"
                    ></circle>
                    <path
                      d="M25 35.5C24.1716 35.5 23.5 36.1716 23.5 37C23.5 37.8284 24.1716 38.5 25 38.5V35.5ZM49.0607 38.0607C49.6464 37.4749 49.6464 36.5251 49.0607 35.9393L39.5147 26.3934C38.9289 25.8076 37.9792 25.8076 37.3934 26.3934C36.8076 26.9792 36.8076 27.9289 37.3934 28.5147L45.8787 37L37.3934 45.4853C36.8076 46.0711 36.8076 47.0208 37.3934 47.6066C37.9792 48.1924 38.9289 48.1924 39.5147 47.6066L49.0607 38.0607ZM25 38.5L48 38.5V35.5L25 35.5V38.5Z"
                      fill="black"
                    ></path>
                  </svg>
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trainer;
