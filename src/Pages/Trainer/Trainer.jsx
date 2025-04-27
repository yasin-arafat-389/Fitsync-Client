import { useState } from "react";
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
  const axios = useAxios();
  const { user } = useAuth();
  const [role] = useRole();

  const [currentPage, setCurrentPage] = useState(1);
  const trainersPerPage = 6;

  // Filters
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedTime, setSelectedTime] = useState("");

  const availableDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const availableTimes = [
    "7 AM - 8 AM",
    "9 AM - 10 AM",
    "2 PM - 3 PM",
    "4 PM - 5 PM",
    "7 PM - 8 PM",
    "9 PM - 10 PM",
  ];

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = (totalPages) => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const { data = [] } = useQuery({
    queryKey: ["trainer", user?.email],
    queryFn: async () => {
      const res = await axios.get(`/trainers?email=${user?.email}`);
      return res.data;
    },
  });

  const handleAlert = () => {
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

  const { data: trainers, isLoading } = useQuery({
    queryKey: ["allTrainers"],
    queryFn: async () => {
      const res = await axios.get(`/all-trainers`);
      return res.data;
    },
  });

  if (isLoading) {
    return <RouteChangeLoader />;
  }

  // Filtering logic
  const filteredTrainers = trainers.filter((trainer) => {
    const matchesDays =
      selectedDays.length === 0 ||
      trainer.availableDays.some((day) => selectedDays.includes(day));
    const matchesTime =
      !selectedTime || trainer.availableTime.includes(selectedTime);
    return matchesDays && matchesTime;
  });

  // Pagination logic
  const totalTrainers = filteredTrainers.length;
  const totalPages = Math.ceil(totalTrainers / trainersPerPage);
  const indexOfLastTrainer = currentPage * trainersPerPage;
  const indexOfFirstTrainer = indexOfLastTrainer - trainersPerPage;
  const currentTrainers = filteredTrainers.slice(
    indexOfFirstTrainer,
    indexOfLastTrainer
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <Helmet>
        <title>FitSync | Trainer</title>
      </Helmet>
      <PageTitle title="Trainer" />

      <div className="container mx-auto px-4 md:px-8 my-16">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full lg:w-1/4 bg-[#F0F0D7] p-6 rounded-lg shadow-md border border-gray-200 self-start">
            <h3 className="font-bold text-2xl text-gray-800 mb-6">Filters</h3>

            {/* Available Days Filter */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-gray-700 mb-4">
                Available Days
              </h4>
              <div className="space-y-2">
                {availableDays.map((day) => (
                  <div key={day} className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id={`day-${day}`} // Unique ID for each checkbox
                      value={day}
                      onChange={(e) =>
                        setSelectedDays((prev) =>
                          e.target.checked
                            ? [...prev, e.target.value]
                            : prev.filter((d) => d !== e.target.value)
                        )
                      }
                      className="h-4 w-4 text-blue-500 border-gray-300 focus:ring-blue-400"
                    />
                    <label
                      htmlFor={`day-${day}`}
                      className="text-gray-600 font-medium cursor-pointer"
                    >
                      {day}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Available Time Filter */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-gray-700 mb-4">
                Available Time
              </h4>
              <select
                className="w-full p-3 border rounded-lg text-gray-700 bg-gray-50 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
              >
                <option value="" className="text-gray-400">
                  All Times
                </option>
                {availableTimes.map((time) => (
                  <option key={time} value={time} className="text-gray-700">
                    {time}
                  </option>
                ))}
              </select>
            </div>

            {/* Reset Filters Button */}
            <div className="text-center">
              <button
                className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md transition duration-300"
                onClick={() => {
                  setSelectedDays([]);
                  setSelectedTime("");
                }}
              >
                Reset Filters
              </button>
            </div>
          </aside>

          {/* Trainers Grid */}
          <div className="flex-1">
            {currentTrainers.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentTrainers.map((trainer) => (
                  <div
                    key={trainer._id}
                    className="p-6 bg-[#F9F6E6] border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300"
                  >
                    {/* Trainer Image */}
                    <div className="flex justify-center mb-4">
                      <img
                        src={
                          trainer.image || "https://i.ibb.co/HN9NtYY/user.png"
                        }
                        alt={trainer.name}
                        className="w-28 h-28 rounded-full border-4 border-blue-500 object-cover"
                      />
                    </div>

                    {/* Trainer Details */}
                    <div className="text-center">
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        {trainer.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-1">
                        <span className="font-medium">Experience:</span>{" "}
                        {trainer.experience} years
                      </p>
                      <p className="text-sm text-gray-600 mb-4">
                        <span className="font-medium">Available:</span>{" "}
                        {trainer.availableDays.length} days/week
                      </p>

                      {/* Know More Button */}
                      <Link to={`/trainer/details/${trainer._id}`}>
                        <Button
                          size="sm"
                          className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-full capitalize"
                        >
                          Know More
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center bg-gray-50 p-8 rounded shadow-md text-center">
                <span className="text-4xl mb-4">😔</span>
                <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                  No Trainers Available
                </h2>
                <p className="text-gray-600">
                  Unfortunately, there are no trainers available for the
                  selected time slot. Please try selecting a different time or
                  day.
                </p>
              </div>
            )}

            {/* Pagination */}
            {currentTrainers.length > 0 && (
              <div className="flex justify-center mt-10 gap-2">
                <button
                  className={`px-3 py-1 border rounded ${
                    currentPage === 1
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-blue-500 text-white"
                  }`}
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index}
                    className={`px-3 py-1 border rounded ${
                      currentPage === index + 1
                        ? "bg-blue-500 text-white"
                        : "bg-white text-blue-500"
                    }`}
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </button>
                ))}
                <button
                  className={`px-3 py-1 border rounded ${
                    currentPage === totalPages
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-blue-500 text-white"
                  }`}
                  onClick={() => handleNextPage(totalPages)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            )}

            {/* Become a Trainer */}
            {role !== "trainer" && role !== "admin" && (
              <div className="mt-12 flex justify-center">
                {data.status === "requested" || data.status === "rejected" ? (
                  <button className="beTrainer" onClick={handleAlert}>
                    <span className="font-bold text-[18px]">
                      Become A Trainer
                    </span>
                  </button>
                ) : (
                  <Link to="/become-trainer">
                    <button className="beTrainer">
                      <span className="font-bold text-[18px]">
                        Become A Trainer
                      </span>
                    </button>
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trainer;
