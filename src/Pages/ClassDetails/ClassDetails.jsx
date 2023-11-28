import { Link, useParams } from "react-router-dom";
import PageTitle from "../../Components/PageTitle/PageTitle";
import useAxios from "../../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import RouteChangeLoader from "../../Utilities/RouteChangeLoader/RouteChangeLoader";
import { Button } from "@material-tailwind/react";

const ClassDetails = () => {
  let classDetails = useParams();

  let axios = useAxios();

  let { data = [], isLoading } = useQuery({
    queryKey: ["singleClass", classDetails.id],
    queryFn: async () => {
      let res = await axios.get(`/classes/${classDetails.id}`).then();
      return res.data;
    },
  });

  if (isLoading) {
    return <RouteChangeLoader />;
  }

  return (
    <div>
      <PageTitle title="Class Details" />

      <div className="w-[80%] mx-auto my-16 flex flex-col md:flex-col lg:flex-row gap-10">
        <div className="w-full md:w-full lg:w-2/3">
          <main className="flex flex-col gap-5">
            <h2 className="text-4xl font-semibold text-gray-800 leading-tight">
              {data?.classTitle}
            </h2>

            <p className="pb-6">{data?.classDescription}</p>
          </main>
        </div>

        {/* Sidebar */}
        <div className="w-full md:w-full lg:w-1/3">
          <div className="w-full">
            <div className="sidebarTitle bg-[#FF4D24]">
              <h1 className="text-white text-center font-bold p-4 text-[25px]">
                Class Information
              </h1>
            </div>
            <div className="bg-[#606c88]">
              <div className="flex gap-2 justify-center items-center py-4">
                <h1 className="text-white font-bold text-[20px]">Trainer:</h1>
                <h1 className="text-yellow-600 font-bold text-[20px]">
                  {data?.name}
                </h1>
              </div>

              <div className="flex gap-2 justify-center items-center py-4">
                <h1 className="text-white font-bold text-[20px]">Intensity:</h1>
                <h1 className="text-yellow-600 font-bold text-[20px]">
                  {data?.intensity}
                </h1>
              </div>

              <div className="flex gap-2 justify-center items-center py-4">
                <h1 className="text-white font-bold text-[20px]">
                  Seat Capacity:
                </h1>
                <h1 className="text-yellow-600 font-bold text-[20px]">
                  {data?.seatCapacity}
                </h1>
              </div>

              <div className="flex gap-2 justify-center items-center py-4">
                <h1 className="text-white font-bold text-[20px]">Time:</h1>
                <h1 className="text-yellow-600 font-bold text-[20px]">
                  {data?.time}
                </h1>
              </div>

              <div className="flex gap-2 justify-center items-center py-4">
                <Link to={`/trainer`}>
                  <Button className="bg-amber-500 text-black font-bold text-[16px]">
                    Join Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassDetails;
