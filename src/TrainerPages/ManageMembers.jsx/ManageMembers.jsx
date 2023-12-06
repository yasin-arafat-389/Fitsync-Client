import { useState } from "react";
import useBookedSlots from "../../Hooks/useBookedSlots";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Dialog,
  Input,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import useAxios from "../../Hooks/useAxios";
import toast from "react-hot-toast";
import NoDataFound from "../../Utilities/NoDataFound/NoDataFound";
import { Helmet } from "react-helmet-async";
import { ImSpinner9 } from "react-icons/im";

const ManageMembers = () => {
  let [bookedUser] = useBookedSlots();
  let axios = useAxios();

  const [open, setOpen] = useState(false);
  let [details, setDetails] = useState();
  let [subject, setSubject] = useState("");
  let [message, setMessage] = useState("");
  let [loading, setLoading] = useState(false);

  const handleOpen = (item) => {
    setOpen(!open);
    setDetails(item);
  };

  let handleSendInstruction = async (e) => {
    e.preventDefault();
    setLoading(true);

    await axios
      .post("/send-instruction", {
        to: details?.email,
        subject,
        message,
        receiverName: details?.name,
        trainer: details?.trainer,
        slot: details?.slot,
      })
      .then(() => {
        toast.success("Instruction sent successfully 👍");
        setLoading(false);
        setOpen(false);
      });
  };

  // handle assign activity
  let [activityDetails, setActivityDetails] = useState();
  let [activity, setActivity] = useState("");
  let [loadingAssign, setLoadingAssign] = useState(false);
  const [openActivity, setOpenActivity] = useState(false);
  const handleOpenActivity = (item) => {
    setOpenActivity(!openActivity);
    setActivityDetails(item);
  };

  let handleAssignActivity = async () => {
    setLoadingAssign(true);
    await axios
      .post("/assign-activity", {
        email: activityDetails.email,
        slot: activityDetails.slot,
        activity: activity,
      })
      .then(() => {
        toast.success("Activity assigned successfully!!");
        setOpenActivity(!openActivity);
        setLoadingAssign(false);
      });
  };

  return (
    <div>
      <Helmet>
        <title>FitSync | Manage Members</title>
      </Helmet>
      <h1 className="text-[20px] font-bold">Manage Members:</h1>

      <div>
        {bookedUser.length === 0 ? (
          <div className="mt-5">
            <NoDataFound text="You currently have no members" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-7 mt-5 mb-10">
              {bookedUser.map((item, index) => (
                <div className="" key={index}>
                  <div className="bg-[#E1EDF2] font-semibold text-center rounded-3xl border shadow-lg p-10 max-w-xs">
                    <img
                      className="mb-3 w-32 h-32 rounded-full shadow-lg mx-auto"
                      src={item?.photo}
                    />
                    <h1 className="text-lg text-gray-700"> {item?.name} </h1>
                    <div>
                      <h3 className="text-sm text-gray-700 ">
                        Membership: {item?.pkg}{" "}
                      </h3>
                    </div>

                    <div>
                      <h3 className="text-sm text-gray-700 ">
                        Slot: {item?.slot}{" "}
                      </h3>
                    </div>

                    <button
                      onClick={() => handleOpen(item)}
                      className="bg-indigo-600 px-8 py-2 mt-8 rounded-3xl text-gray-100 font-semibold tracking-wide"
                    >
                      Send Instruction
                    </button>

                    <button
                      className="bg-green-600 px-8 py-2 mt-3 rounded-3xl text-gray-100 font-semibold tracking-wide"
                      onClick={() => handleOpenActivity(item)}
                    >
                      Assign Activity
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <Dialog
              size="xs"
              open={open}
              handler={handleOpen}
              className="bg-transparent shadow-none"
            >
              <form onSubmit={handleSendInstruction}>
                <Card className="mx-auto w-full max-w-[24rem]">
                  <CardBody className="flex flex-col gap-4">
                    <Typography variant="h5" color="blue-gray" className="mb-6">
                      Send{" "}
                      <span className="text-amber-800 italic">
                        {details?.name}
                      </span>{" "}
                      instruction about your session
                    </Typography>

                    <Input
                      label="Subject"
                      size="lg"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                    />

                    <Textarea
                      label="Message"
                      size="lg"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </CardBody>
                  <CardFooter className="pt-0">
                    <Button
                      type="submit"
                      variant="gradient"
                      fullWidth
                      disabled={!subject || !message || loading ? true : false}
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
                  </CardFooter>
                </Card>
              </form>
            </Dialog>

            {/* Activity Assigning modal */}
            <Dialog
              size="sm"
              open={openActivity}
              handler={handleOpenActivity}
              className="bg-transparent shadow-none"
            >
              <Card className="mx-auto w-full max-w-[24rem]">
                <CardBody className="flex flex-col gap-4">
                  <Typography variant="h5" color="blue-gray" className="mb-6">
                    Assign{" "}
                    <span className="text-amber-800 italic">
                      {activityDetails?.name}
                    </span>{" "}
                    an activity for this week.{" "}
                    <Typography className="text-gray-600 italic font-bold">
                      (example: Cardio, Weight lifting, Free hand etc...)
                    </Typography>
                  </Typography>

                  <Input
                    label="Activity"
                    size="lg"
                    value={activity}
                    onChange={(e) => setActivity(e.target.value)}
                  />
                </CardBody>
                <CardFooter className="pt-0">
                  <Button
                    type="submit"
                    variant="gradient"
                    fullWidth
                    disabled={!activity || loadingAssign ? true : false}
                    onClick={handleAssignActivity}
                  >
                    {loadingAssign ? (
                      <div className="flex items-center justify-center gap-4">
                        <ImSpinner9 className="animate-spin text-[20px]" />
                        Assigning
                      </div>
                    ) : (
                      "Assign"
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </Dialog>
          </>
        )}
      </div>
    </div>
  );
};

export default ManageMembers;
