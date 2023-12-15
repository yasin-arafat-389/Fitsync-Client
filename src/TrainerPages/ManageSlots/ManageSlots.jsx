import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxios from "../../Hooks/useAxios";
import DashboardLoader from "../../Utilities/DashboardLoader/DashboardLoader";
import {
  Avatar,
  Button,
  Dialog,
  Option,
  Select,
  Textarea,
} from "@material-tailwind/react";
import { FaRegClock } from "react-icons/fa6";

import useBookedSlots from "../../Hooks/useBookedSlots";
import { useState } from "react";
import NoDataFound from "../../Utilities/NoDataFound/NoDataFound";
import { Helmet } from "react-helmet-async";
import { ImSpinner9 } from "react-icons/im";
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

  // Handle cancel a slot

  let [slotDetails, setSlotDetails] = useState([]);
  let [openEmailDialogue, setOpenEmailDialogue] = useState(false);
  let [loading, setLoading] = useState(false);
  let [message, setMessage] = useState("");

  let handleSelectedSlot = (slot, trainerName) => {
    setSlotDetails({ slot, trainerName });
    setOpenEmailDialogue(!openEmailDialogue);
  };

  let handleCancelSlot = async () => {
    setLoading(true);

    await axios
      .post("/cancel-slot", {
        message: message,
        slot: slotDetails.slot,
        trainer: slotDetails.trainerName,
      })
      .then((res) => {
        console.log(res);
        setLoading(false);
        toast.success("Message has been sent!!");
        setOpenEmailDialogue(!openEmailDialogue);
      });
  };

  let slot = [];
  bookedUser.map((item) => {
    if (!slot.includes(item.slot)) {
      slot.push(item.slot);
    }
  });

  if (isLoading) {
    return <DashboardLoader />;
  }

  return (
    <div>
      <Helmet>
        <title>FitSync | Manage Slots</title>
      </Helmet>
      <h1 className="text-[20px] font-bold">My Slots:</h1>
      <div className="flex flex-wrap mt-5 gap-3 justify-between">
        <div className="flex gap-3">
          {trainer.availableTime.map((item, index) => (
            <div key={index}>
              <div className="bg-green-500 text-[16px] p-2 text-white rounded-lg font-bold flex justify-center items-center gap-3">
                <FaRegClock fontSize={"18"} /> {item}
              </div>
            </div>
          ))}
        </div>

        {bookedUser.length === 0 ? (
          ""
        ) : (
          <>
            <div>
              <Select
                label={
                  <label style={{ fontWeight: "bold" }}>Cancel a slot</label>
                }
                error
              >
                {slot.map((item, index) => (
                  <Option
                    key={index}
                    onClick={() => handleSelectedSlot(item, trainer?.name)}
                  >
                    {item}
                  </Option>
                ))}
              </Select>
            </div>
          </>
        )}
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

            {/* Send email modal */}
            <Dialog
              open={openEmailDialogue}
              size="sm"
              handler={handleSelectedSlot}
            >
              <div className="p-7">
                <h1 className="text-[20px] font-bold mb-6">
                  Write the reason you want to <br />
                  cancel{" "}
                  <span className="italic text-white bg-green-300 p-1 rounded-lg">
                    {`${slotDetails.slot}`}
                  </span>{" "}
                  slot
                </h1>

                <Textarea
                  label="Message"
                  size="lg"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />

                <Button
                  type="submit"
                  variant="gradient"
                  className="mt-3"
                  disabled={loading || !message ? true : false}
                  fullWidth
                  onClick={handleCancelSlot}
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-4">
                      <ImSpinner9 className="animate-spin text-[20px]" />
                      Sending
                    </div>
                  ) : (
                    "Send"
                  )}
                </Button>
              </div>
            </Dialog>
          </>
        )}
      </div>
    </div>
  );
};

export default ManageSlots;
