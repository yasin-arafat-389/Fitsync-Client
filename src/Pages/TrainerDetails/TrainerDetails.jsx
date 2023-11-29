import { Link, Navigate, useParams } from "react-router-dom";
import RouteChangeLoader from "../../Utilities/RouteChangeLoader/RouteChangeLoader";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hooks/useAxios";
import { Button, Chip } from "@material-tailwind/react";
import { FaRegClock } from "react-icons/fa6";
import useAuth from "../../Hooks/useAuth";
import useRole from "../../Hooks/useRole";

const TrainerDetails = () => {
  let singleTrainer = useParams();
  let axios = useAxios();
  let { user } = useAuth();
  let [role] = useRole();

  let { data: trainer, isLoading } = useQuery({
    queryKey: ["singleTrainer", singleTrainer.id],
    queryFn: async () => {
      let res = await axios.get(`/trainers/single/${singleTrainer.id}`).then();
      return res.data;
    },
  });

  let saveInfo = (name, slot) => {
    const upadatedDetails = [name, slot];
    localStorage.setItem(`${user?.email}`, JSON.stringify(upadatedDetails));
  };

  if (isLoading) {
    return <RouteChangeLoader />;
  }

  if (role === "trainer") {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <div className="py-16">
        <div className="w-[60%] mx-auto px-6 py-6  text-center bg-gray-800 rounded-lg lg:mt-0 xl:px-10">
          <div className="space-y-4 xl:space-y-6">
            <img
              className="mx-auto object-cover rounded-full h-36 w-36"
              src={trainer.image || "https://i.ibb.co/HN9NtYY/user.png"}
              alt="author avatar"
            />
            <div className="space-y-2">
              <div className="flex justify-center items-center flex-col space-y-3 text-lg font-medium leading-6">
                <h3 className="text-white text-[25px]">{trainer.name}</h3>
                <p className="text-white">Trainer</p>
              </div>
            </div>

            <div className="flex flex-col gap-5 justify-center items-center">
              <div className="text-white text-[20px]">
                {trainer.name} Will be available every{" "}
              </div>
              <div className="flex  flex-wrap  gap-5">
                {trainer.availableDays.map((item, index) => (
                  <div key={index}>
                    <Chip
                      color="green"
                      value={item}
                      className="text-[16px] capitalize"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="text-white text-[20px]">
                available slot of {trainer.name}:
              </div>

              <div className="flex flex-wrap justify-center items-center gap-5">
                {trainer.availableTime.map((item, index) => (
                  <div key={index}>
                    <Link to="/pricing">
                      <Button
                        className="bg-green-500 text-[16px] flex justify-center items-center gap-3"
                        onClick={() => saveInfo(trainer.name, item)}
                      >
                        <FaRegClock fontSize={"18"} /> {item}
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainerDetails;
