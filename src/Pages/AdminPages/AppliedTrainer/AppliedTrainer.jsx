import { Avatar, Button, Chip, Dialog } from "@material-tailwind/react";
import useAxios from "../../../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { ImSpinner9 } from "react-icons/im";
import DashboardLoader from "../../../Utilities/DashboardLoader/DashboardLoader";
import { useState } from "react";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import NoDataFound from "../../../Utilities/NoDataFound/NoDataFound";

const AppliedTrainer = () => {
  let axios = useAxios();

  let {
    data: trainers,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allTrainersRequested"],
    queryFn: async () => {
      let res = await axios.get(`/all-trainers/requested`).then();
      return res.data;
    },
  });

  // Modal
  const [open, setOpen] = useState(false);
  let [details, setDetails] = useState();

  let [loadingAccept, setLoadingAccept] = useState(false);
  let [loadingReject, setLoadingReject] = useState(false);
  const handleOpen = (item) => {
    setOpen(!open);
    setDetails(item);
  };

  let handleAccept = async (id, email, name) => {
    setLoadingAccept(true);
    try {
      await axios
        .post("/update-trainer-status/accept", {
          trainerId: id,
          status: "accepted",
          email: email,
          role: "trainer",
          name: name,
        })
        .then(() => {
          refetch();
          toast.success("Trainer accepted successfully");
          setOpen(!open);
          setLoadingAccept(false);
        });
    } catch (error) {
      console.error("Error accepting trainer:", error);
      toast.error("Failed to accept trainer");
    }
  };

  let handleReject = async (id, email, name) => {
    console.log(details);
    setLoadingReject(true);
    try {
      await axios
        .post("/update-trainer-status/reject", {
          trainerId: id,
          status: "rejected",
          email: email,
          name: name,
        })
        .then(() => {
          setLoadingReject(false);
          setOpen(!open);
          refetch();
          toast.success("Request rejected successfully");
        });
    } catch (error) {
      console.error("Error accepting trainer:", error);
      toast.error("Failed to accept trainer");
    }
  };

  if (isLoading) {
    return <DashboardLoader />;
  }

  return (
    <div>
      <Helmet>
        <title>FitSync | Applied Trainers</title>
      </Helmet>

      <div>
        {trainers.length === 0 ? (
          <div className="mt-10">
            <NoDataFound text="No Applied Trainers to show" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-9 mb-10">
              {trainers.map((item, index) => (
                <div
                  className="booked-users shadow-lg hover:shadow-xl"
                  key={index}
                >
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
                        <span className="text-indigo-700 italic">
                          {item?.name}
                        </span>
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
          </>
        )}
      </div>

      <Dialog open={open} handler={handleOpen} className="bg-transparent">
        <div className="">
          <div className="w-full max-w-full py-8 flex flex-col items-center justify-center bg-[#FFFBFB] rounded-lg ">
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
                    <div className="mt-3">
                      <h1 className="text-lg font-bold">
                        Experience:{" "}
                        <span className="italic text-blue-700">
                          {details?.experience} years
                        </span>
                      </h1>
                    </div>
                  </div>

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
            <div className="flex gap-4 mt-8">
              <Button
                className="bg-green-500"
                onClick={() =>
                  handleAccept(details._id, details.email, details.name)
                }
                disabled={loadingAccept || loadingReject ? true : false}
              >
                {loadingAccept ? (
                  <div className="flex items-center justify-center gap-4">
                    <ImSpinner9 className="animate-spin text-[20px]" />
                    Accepting
                  </div>
                ) : (
                  "Accept"
                )}
              </Button>
              <Button
                className="bg-red-500"
                onClick={() =>
                  handleReject(details._id, details.email, details.name)
                }
                disabled={loadingAccept || loadingReject ? true : false}
              >
                {loadingReject ? (
                  <div className="flex items-center justify-center gap-4">
                    <ImSpinner9 className="animate-spin text-[20px]" />
                    Rejecting
                  </div>
                ) : (
                  "Reject"
                )}
              </Button>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default AppliedTrainer;
