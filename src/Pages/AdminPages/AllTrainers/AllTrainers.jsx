import { useQuery } from "@tanstack/react-query";
import DashboardLoader from "../../../Utilities/DashboardLoader/DashboardLoader";
import useAxios from "../../../Hooks/useAxios";
import { Avatar, Chip, Dialog } from "@material-tailwind/react";
import { useState } from "react";

import { Helmet } from "react-helmet-async";

const AllTrainers = () => {
  let axios = useAxios();

  let { data: trainers, isLoading } = useQuery({
    queryKey: ["allTrainers"],
    queryFn: async () => {
      let res = await axios.get(`/all-trainers`).then();
      return res.data;
    },
  });

  let [details, setDetails] = useState();
  const [open, setOpen] = useState(false);

  const handleOpen = (item) => {
    setDetails(item);
    setOpen(!open);
  };

  if (isLoading) {
    return <DashboardLoader />;
  }

  return (
    <div>
      <Helmet>
        <title>FitSync | All Trainers</title>
      </Helmet>

      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-9 mb-10">
        {trainers.map((item, index) => (
          <div className="booked-users shadow-lg hover:shadow-xl" key={index}>
            <div className="bg-[#f4e0c3] rounded-lg overflow-hidden shadow-lg transition-transform transform">
              <div className="flex justify-center items-center my-5">
                <Avatar
                  src={item?.image || "https://i.ibb.co/HN9NtYY/user.png"}
                  alt="avatar"
                  size="xxl"
                />
              </div>

              <div className=" mx-5">
                <h1 className="text-center text-[18px] font-bold">
                  <span className="text-indigo-700 italic">{item?.name}</span>
                </h1>
              </div>

              <div className="p-4">
                <button
                  className="w-full bg-blue-500 text-white rounded-full px-4 py-2 hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
                  onClick={() => handleOpen(item)}
                >
                  See Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={open} handler={handleOpen} className="bg-transparent">
        <div className="">
          <div className="w-full max-w-full py-8 flex flex-row items-center justify-center bg-[#FFFBFB] rounded-lg ">
            <div className="flex flex-col md:flex-row w-3/4 md:w-5/6 space-x-0 md:space-x-8">
              <div className="w-full md:w-2/5 flex flex-col items-center justify-center">
                <figure className="w-1/2 md:w-full  rounded-full overflow-hidden">
                  <img
                    src={details?.image || "https://i.ibb.co/HN9NtYY/user.png"}
                    alt="woman wearing a headwrap and an Africa-shaped earring while smiling"
                    className="mx-auto"
                  />
                </figure>
              </div>
              <div className="w-full md:w-3/5 space-y-4 flex flex-col justify-center items-center">
                <div className="flex flex-col justify-center">
                  <h1 className="text-center md:text-left text-2xl font-bold text-gray-900">
                    {details?.name}
                  </h1>

                  <div className="inline text-gray-700 font-normal leading-6 w-full text-base">
                    <div className="flex flex-wrap gap-2 mt-4">
                      <h1 className="text-lg font-bold">Available:</h1>
                      {details?.availableDays?.map((days, index) => (
                        <Chip
                          key={index}
                          variant="ghost"
                          color="blue"
                          size="sm"
                          value={days}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="inline text-gray-700 font-normal leading-6 w-full text-base">
                    <div className="flex flex-wrap gap-2 mt-7">
                      <h1 className="text-lg font-bold">Slot:</h1>
                      {details?.availableTime?.map((days, index) => (
                        <Chip
                          key={index}
                          variant="ghost"
                          color="green"
                          size="sm"
                          value={days}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="inline text-gray-700 font-normal leading-6 w-full text-base">
                    <div className="flex flex-wrap gap-2 mt-7">
                      <h1 className="text-lg font-bold">Skills:</h1>
                      {details?.skills?.map((days, index) => (
                        <Chip
                          key={index}
                          variant="ghost"
                          color="deep-purple"
                          size="sm"
                          value={days}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default AllTrainers;
