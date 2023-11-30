import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxios from "../../Hooks/useAxios";
import DashboardLoader from "../../Utilities/DashboardLoader/DashboardLoader";
import { Avatar, Button, Dialog } from "@material-tailwind/react";
import { FaRegClock } from "react-icons/fa6";
import useBookedSlots from "../../Hooks/useBookedSlots";
import { useState } from "react";
import NoDataFound from "../../Utilities/NoDataFound/NoDataFound";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const ManageSlots = () => {
  let axios = useAxios();
  let { user } = useAuth();
  let [bookedUser] = useBookedSlots();

  let { data: trainer, isLoading } = useQuery({
    queryKey: ["singleTrainerByEmail", user?.email],
    queryFn: async () => {
      let res = await axios.get(`/trainers?email=${user?.email}`).then();
      return res.data;
    },
  });

  const [open, setOpen] = useState(false);
  let [details, setDetails] = useState();

  const handleOpen = (item) => {
    setOpen(!open);
    setDetails(item);
  };

  const rejectMember = (item) => {
    Swal.fire({
      title: `Are you sure you want to reject ${item?.name}?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.post("/reject-member", { email: item?.email }).then(() => {
          toast.success("Member has been rejected!!");
        });
      }
    });
  };

  if (isLoading) {
    return <DashboardLoader />;
  }

  return (
    <div>
      <Helmet>
        <title>FitSync | Manage Slots</title>
      </Helmet>
      <h1 className="text-[20px] font-bold">My Slots:</h1>
      <div className="flex flex-wrap mt-5 gap-5">
        {trainer.availableTime.map((item, index) => (
          <div key={index}>
            <Button className="bg-green-500 text-[16px] cursor-default flex justify-center items-center gap-3">
              <FaRegClock fontSize={"18"} /> {item}
            </Button>
          </div>
        ))}
      </div>

      <div>
        {bookedUser.length === 0 ? (
          <div className="mt-7">
            <NoDataFound text="No slot has been booked yet" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-7 mb-10">
              {bookedUser.map((item, index) => (
                <div
                  className="booked-users mt-10 shadow-lg hover:shadow-xl"
                  key={index}
                >
                  <div className="bg-gray-200 rounded-lg overflow-hidden shadow-lg transition-transform transform">
                    <div className="p-1 bg-blue-200"></div>

                    <div className="flex justify-center items-center my-5">
                      <Avatar src={item?.photo} alt="avatar" size="xxl" />
                    </div>

                    <div className="py-5 mx-5">
                      <h1 className="text-center text-[18px] font-bold">
                        <span className="text-blue-700 italic">
                          {item?.name}
                        </span>{" "}
                        booked your{" "}
                        <span className="text-green-700 italic">
                          {item?.slot}
                        </span>{" "}
                        slot.
                      </h1>
                    </div>

                    <div className="p-4">
                      <button
                        className="w-full bg-blue-500 text-white rounded-full px-4 py-2 hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
                        onClick={() => handleOpen(item)}
                      >
                        See Details
                      </button>

                      <button
                        className="w-full bg-red-500 text-white rounded-full px-4 py-2 hover:bg-red-700 focus:outline-none focus:shadow-outline-blue active:bg-red-800 mt-2"
                        onClick={() => rejectMember(item)}
                      >
                        Reject Member
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              <Dialog
                size="sm"
                open={open}
                handler={handleOpen}
                className="bg-transparent"
              >
                <div className="booked-users mt-10">
                  <div className="bg-gray-200 rounded-lg overflow-hidden shadow-lg transition-transform transform ">
                    <div className="p-1 bg-blue-400"></div>

                    <div className="flex justify-center items-center my-5">
                      <Avatar src={details?.photo} alt="avatar" size="xxl" />
                    </div>

                    <div className="py-5 flex flex-col gap-3">
                      <h1 className="text-center text-[18px] font-bold">
                        Name:{" "}
                        <span className="text-blue-700 italic">
                          {details?.name}
                        </span>{" "}
                      </h1>

                      <h1 className="text-center text-[18px] font-bold">
                        Email:{" "}
                        <span className="text-blue-700 italic">
                          {details?.email}
                        </span>{" "}
                      </h1>

                      <h1 className="text-center text-[18px] font-bold">
                        Membership:{" "}
                        <span className="text-blue-700 italic">
                          {details?.pkg}
                        </span>{" "}
                      </h1>

                      <h1 className="text-center text-[18px] font-bold">
                        Slot:{" "}
                        <span className="text-blue-700 italic">
                          {details?.slot}
                        </span>{" "}
                      </h1>
                    </div>
                  </div>
                </div>
              </Dialog>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ManageSlots;
