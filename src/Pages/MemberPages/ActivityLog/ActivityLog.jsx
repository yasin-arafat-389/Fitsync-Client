import { useQuery } from "@tanstack/react-query";
import { GiMuscleUp } from "react-icons/gi";
import { BsClockFill } from "react-icons/bs";
import useAuth from "../../../Hooks/useAuth";
import useAxios from "../../../Hooks/useAxios";
import DashboardLoader from "../../../Utilities/DashboardLoader/DashboardLoader";
import { Button, Chip } from "@material-tailwind/react";
import NoDataFound from "../../../Utilities/NoDataFound/NoDataFound";
import { Link } from "react-router-dom";

const ActivityLog = () => {
  let { user } = useAuth();
  let axios = useAxios();

  let { data = [], isLoading } = useQuery({
    queryKey: ["myActivity", user?.email],
    queryFn: async () => {
      let res = await axios.get(`/my-activity?email=${user?.email}`).then();
      return res.data;
    },
  });

  const activities = [
    "Cardio",
    "Weight Lifting",
    "Yoga",
    "Running",
    "Swimming",
    "Cycling",
    "Pilates",
    "HIIT Workout",
    "Zumba",
    "CrossFit",
    "Martial Arts",
    "Dance",
    "Hiking",
    "Rowing",
    "Kickboxing",
  ];
  const getRandomActivity = () => {
    const randomIndex = Math.floor(Math.random() * activities.length);
    return activities[randomIndex];
  };

  if (isLoading) {
    return <DashboardLoader />;
  }

  return (
    <div>
      {data.pricingData.length === 0 ? (
        <div className="mt-5">
          <NoDataFound text={`You currently have no activity`} />

          <Link to="/trainer" className="mt-6 flex justify-center items-center">
            <Button className="capitalize bg-blue-500 text-lg">
              Choose a Trainer to get started
            </Button>
          </Link>
        </div>
      ) : (
        <>
          {/* Cards */}
          <div className="max-w-7xl w-full mx-auto py-6 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row w-full gap-10 mb-2 lg:mb-4">
              <div className="w-full lg:w-2/5">
                <div className="widget w-full p-4 rounded-lg bg-gray-200 border-l-4 border-purple-400">
                  <div className="flex items-center gap-3">
                    <div className="icon w-14 p-3.5 bg-purple-400 text-white rounded-full mr-3">
                      <GiMuscleUp fontSize={"30"} />
                    </div>
                    <div className="flex flex-col gap-2 justify-center">
                      <div className="text-xl font-bold">Your Trainers</div>
                      <div>
                        {data.trainerDetails.map((item, index) => (
                          <div
                            key={index}
                            className="text-sm text-gray-600 font-bold"
                          >
                            {item.name}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full lg:w-2/5">
                <div className="widget w-full p-4 rounded-lg bg-gray-200 border-l-4 border-blue-400">
                  <div className="flex items-center gap-3">
                    <div className="icon w-14 p-3.5 bg-blue-400 text-white rounded-full mr-3">
                      <BsClockFill fontSize={"30"} />
                    </div>
                    <div className="flex flex-col gap-2 justify-center">
                      <div className="text-xl font-bold">Your Slots</div>
                      <div>
                        <div className="text-sm text-gray-600 font-bold">
                          {data.pricingData.map((item, index) => (
                            <div
                              key={index}
                              className="text-sm text-gray-600 font-bold"
                            >
                              {item.slot}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tables */}
          <div className="w-full max-w-2xl mb-10 ml-6 bg-gray-200 shadow-lg rounded-sm border border-gray-200">
            <header className="px-5 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-800 text-xl">
                Activity Schedule
              </h2>
            </header>
            <div className="p-3">
              <div className="">
                <table className="table-auto w-full">
                  <thead className="text-xs font-semibold uppercase text-white bg-blue-500">
                    <tr>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-left capitalize text-[18px] p-1">
                          Trainer Name
                        </div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-left capitalize text-[18px] p-1">
                          Slot
                        </div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-left capitalize text-[18px] p-1">
                          Activity
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-sm divide-y divide-gray-100">
                    {data.pricingData.map((item, index) => (
                      <tr key={index}>
                        <td className="p-2 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
                              <img
                                className="rounded-full"
                                src={item.image}
                                width="40"
                                height="40"
                              />
                            </div>
                            <div className="font-medium text-gray-800 text-[18px]">
                              {item.trainer}
                            </div>
                          </div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-left flex">
                            <Chip
                              color="green"
                              value={item.slot}
                              className="text-[15px]"
                            />
                          </div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-left font-bold text-[16px] text-purple-500">
                            {getRandomActivity()}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ActivityLog;
