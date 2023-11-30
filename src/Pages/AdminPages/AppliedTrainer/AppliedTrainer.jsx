import { Button, Dialog } from "@material-tailwind/react";
import useAxios from "../../../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import DashboardLoader from "../../../Utilities/DashboardLoader/DashboardLoader";
import { useState } from "react";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";

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
  const handleOpen = () => {
    setOpen(!open);
  };

  let handleAccept = async (id, email) => {
    setOpen(!open);
    try {
      await axios.post("/update-trainer-status/accept", {
        trainerId: id,
        status: "accepted",
        salary: "due",
        email: email,
        role: "trainer",
      });

      refetch();
      toast.success("Trainer accepted successfully");
    } catch (error) {
      console.error("Error accepting trainer:", error);
      toast.error("Failed to accept trainer");
    }
  };

  let handleReject = async (id, email) => {
    setOpen(!open);
    try {
      await axios.post("/update-trainer-status/reject", {
        trainerId: id,
        status: "rejected",
        email: email,
      });

      refetch();
      toast.success("Request rejected successfully");
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
      <table className="table-auto w-full">
        <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-300">
          <tr>
            <th className="p-2 whitespace-nowrap w-1/3">
              <div className="font-semibold text-left text-black text-[17px]">
                Name
              </div>
            </th>
            <th className="p-2 whitespace-nowrap w-1/3">
              <div className="font-semibold text-left text-black text-[17px]">
                Email
              </div>
            </th>
            <th className="p-2 whitespace-nowrap w-1/3">
              <div className="font-semibold text-left text-black text-[17px]">
                Action
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="text-sm divide-y divide-gray-100">
          {trainers.map((item, index) => (
            <tr key={index}>
              <td className="p-2 whitespace-nowrap">
                <div className="flex items-center">
                  <div className=" text-gray-800 font-bold text-[16px]">
                    {item.name}
                  </div>
                </div>
              </td>
              <td className="p-2 whitespace-nowrap">
                <div className="text-left font-bold text-[16px]">
                  {" "}
                  {item.email}
                </div>
              </td>
              <td className="p-2 whitespace-nowrap">
                <div className="text-left font-bold text-[16px]">
                  <Button
                    onClick={() => handleOpen(item._id)}
                    variant="gradient"
                  >
                    See Details
                  </Button>
                </div>

                {/* Modal */}
                <Dialog open={open} handler={handleOpen}>
                  <div className="py-8 flex flex-col gap-5 justify-center items-center">
                    <img
                      src={item.image || "https://i.ibb.co/HN9NtYY/user.png"}
                      className="w-[100px]"
                    />
                    <h1>Name: {item.name}</h1>
                    <h1>Age: {item.age}</h1>
                    <h1>Experience: {item.experience} years</h1>
                    <h1 className="flex gap-2">
                      Available days:
                      {item.availableDays.map((item, index) => (
                        <ul key={index}>
                          <li>{item}</li>
                        </ul>
                      ))}{" "}
                    </h1>

                    <h1 className="flex gap-2">
                      Available time:
                      <div className="flex flex-col">
                        {item.availableTime.map((item, index) => (
                          <ul key={index}>
                            <li>{item}</li>
                          </ul>
                        ))}
                      </div>
                    </h1>

                    <h1 className="flex gap-2">
                      Available days:
                      {item.skills.map((item, index) => (
                        <ul key={index}>
                          <li>{item}</li>
                        </ul>
                      ))}{" "}
                    </h1>

                    <div className="flex gap-4">
                      <Button
                        onClick={() => handleAccept(item._id, item.email)}
                      >
                        Accept
                      </Button>
                      <Button
                        onClick={() => handleReject(item._id, item.email)}
                      >
                        Reject
                      </Button>
                    </div>
                  </div>
                </Dialog>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppliedTrainer;
