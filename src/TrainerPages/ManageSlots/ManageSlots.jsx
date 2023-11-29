import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxios from "../../Hooks/useAxios";
import DashboardLoader from "../../Utilities/DashboardLoader/DashboardLoader";
import { Button } from "@material-tailwind/react";
import { FaRegClock } from "react-icons/fa6";

const ManageSlots = () => {
  let axios = useAxios();
  let { user } = useAuth();

  let { data: trainer, isLoading } = useQuery({
    queryKey: ["singleTrainerByEmail", user?.email],
    queryFn: async () => {
      let res = await axios.get(`/trainers?email=${user?.email}`).then();
      return res.data;
    },
  });

  if (isLoading) {
    return <DashboardLoader />;
  }

  return (
    <div>
      <h1 className="text-[20px] font-bold">My Slots:</h1>
      <div className="flex flex-wrap mt-5 gap-5">
        {trainer.availableTime.map((item, index) => (
          <div key={index}>
            <Button className="bg-green-500 text-[16px] flex justify-center items-center gap-3">
              <FaRegClock fontSize={"18"} /> {item}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageSlots;
