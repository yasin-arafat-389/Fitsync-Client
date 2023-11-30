import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import PageTitle from "../../Components/PageTitle/PageTitle";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hooks/useAxios";
import RouteChangeLoader from "../../Utilities/RouteChangeLoader/RouteChangeLoader";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const Classes = () => {
  let axios = useAxios();

  let { data = [], isLoading } = useQuery({
    queryKey: ["allClasses"],
    queryFn: async () => {
      let res = await axios.get("/classes").then();
      return res.data;
    },
  });

  if (isLoading) {
    return <RouteChangeLoader />;
  }

  return (
    <div>
      <Helmet>
        <title>FitSync | Classes</title>
      </Helmet>

      <PageTitle title="Classes" />

      {/* Weekly activity chart */}
      <div className="my-10">
        <div className="w-full max-w-2xl p-6 mx-auto bg-gray-200 rounded-2xl shadow-xl flex flex-col ">
          <div className="flex justify-center items-center pb-4">
            <span className="capitalize text-xl font-semibold text-gray-600">
              Weekly Physical Activity Chart
            </span>
          </div>
          <div className="flex justify-between font-medium uppercase text-xs pt-4 pb-2 border-t">
            <div className="px-3 border rounded-sm w-14 h-5 flex items-center justify-center border-green-500 text-green-500 shadow-md">
              sun
            </div>

            <span className="px-3 border rounded-sm w-14 h-5 flex items-center justify-center border-green-500 text-green-500 shadow-md">
              mon
            </span>

            <span className="px-3 border rounded-sm w-14 h-5 flex items-center justify-center border-green-500 text-green-500 shadow-md">
              tue
            </span>

            <span className="px-3 border rounded-sm w-14 h-5 flex items-center justify-center border-green-500 text-green-500 shadow-md">
              wed
            </span>

            <span className="px-3 border rounded-sm w-14 h-5 flex items-center justify-center border-green-500 text-green-500 shadow-md">
              thu
            </span>

            <span className="px-3 border rounded-sm w-14 h-5 flex items-center justify-center border-green-500 text-green-500 shadow-md">
              fri
            </span>

            <span className="px-3 border rounded-sm w-14 h-5 flex items-center justify-center border-green-500 text-green-500 shadow-md">
              sat
            </span>
          </div>

          <div className="flex justify-between font-medium text-sm pb-2">
            <span className="px-1 w-14 flex justify-center items-center border hover:border-green-500 hover:text-green-500 cursor-pointer">
              Cardio
            </span>

            <span className="px-1 w-14 flex justify-center items-center border hover:border-green-500 hover:text-green-500 cursor-pointer">
              Weight Lifting
            </span>

            <span className="px-1 w-14 flex justify-center items-center border hover:border-green-500 hover:text-green-500 cursor-pointer">
              Arms
            </span>

            <span className="px-1 w-14 flex justify-center items-center border hover:border-green-500 hover:text-green-500 cursor-pointer">
              Legs
            </span>

            <span className="px-1 w-14 flex justify-center items-center border hover:border-green-500 hover:text-green-500 cursor-pointer">
              Shoulder
            </span>

            <span className="px-1 w-14 flex justify-center items-center border hover:border-green-500 hover:text-green-500 cursor-pointer">
              Free Hand
            </span>

            <span className="px-1 w-14 flex justify-center items-center border hover:border-green-500 hover:text-green-500 cursor-pointer">
              Stamina
            </span>
          </div>
          <div className="flex justify-between font-medium text-sm pb-2">
            <span className="px-1 w-14 flex justify-center items-center border hover:border-green-500 hover:text-green-500 cursor-pointer">
              Chest
            </span>

            <span className="px-1 w-14 flex justify-center items-center border hover:border-green-500 hover:text-green-500 cursor-pointer">
              Back
            </span>

            <span className="px-1 w-14 flex justify-center items-center border hover:border-green-500 hover:text-green-500 cursor-pointer">
              Stamina
            </span>

            <span className="px-1 w-14 flex justify-center items-center border hover:border-green-500 hover:text-green-500 cursor-pointer">
              Weight Lifting
            </span>

            <span className="px-1 w-14 flex justify-center items-center border hover:border-green-500 hover:text-green-500 cursor-pointer">
              Shoulder
            </span>

            <span className="px-1 w-14 flex justify-center items-center border hover:border-green-500 hover:text-green-500 cursor-pointer">
              Leg
            </span>

            <span className="px-1 w-14 flex justify-center items-center border hover:border-green-500 hover:text-green-500 cursor-pointer">
              Cardio
            </span>
          </div>

          <div className="flex justify-between font-medium text-sm pb-2">
            <span className="px-1 w-14 flex justify-center items-center border hover:border-green-500 hover:text-green-500 cursor-pointer">
              Abdominal
            </span>

            <span className="px-1 w-14 flex justify-center items-center border hover:border-green-500 hover:text-green-500 cursor-pointer">
              Free Hand
            </span>

            <span className="px-1 w-14 flex justify-center items-center border hover:border-green-500 hover:text-green-500 cursor-pointer">
              Arms
            </span>

            <span className="px-1 w-14 flex justify-center items-center border hover:border-green-500 hover:text-green-500 cursor-pointer">
              Stamina
            </span>

            <span className="px-1 w-14 flex justify-center items-center border hover:border-green-500 hover:text-green-500 cursor-pointer">
              Back
            </span>

            <span className="px-1 w-14 flex justify-center items-center border hover:border-green-500 hover:text-green-500 cursor-pointer">
              Abdominal
            </span>

            <span className="px-1 w-14 flex justify-center items-center border hover:border-green-500 hover:text-green-500 cursor-pointer">
              Legs
            </span>
          </div>

          <div className="flex justify-between font-medium text-sm pb-2">
            <span className="px-1 w-14 flex justify-center items-center border hover:border-green-500 hover:text-green-500 cursor-pointer">
              Cardio
            </span>

            <span className="px-1 w-14 flex justify-center items-center border hover:border-green-500 hover:text-green-500 cursor-pointer">
              Arms
            </span>

            <span className="px-1 w-14 flex justify-center items-center border hover:border-green-500 hover:text-green-500 cursor-pointer">
              Shoulder
            </span>

            <span className="px-1 w-14 flex justify-center items-center border hover:border-green-500 hover:text-green-500 cursor-pointer">
              Back
            </span>

            <span className="px-1 w-14 flex justify-center items-center border hover:border-green-500 hover:text-green-500 cursor-pointer">
              Weight Lifting
            </span>

            <span className="px-1 w-14 flex justify-center items-center border hover:border-green-500 hover:text-green-500 cursor-pointer">
              Chest
            </span>

            <span className="px-1 w-14 flex justify-center items-center border hover:border-green-500 hover:text-green-500 cursor-pointer">
              Stamina
            </span>
          </div>

          <div className="flex justify-between font-medium text-sm pb-2">
            <span className="px-1 w-14 flex justify-center items-center border hover:border-green-500 hover:text-green-500 cursor-pointer">
              Weight Lifting
            </span>

            <span className="px-1 w-14 flex justify-center items-center border hover:border-green-500 hover:text-green-500 cursor-pointer">
              Shoulder
            </span>

            <span className="px-1 w-14 flex justify-center items-center border hover:border-green-500 hover:text-green-500 cursor-pointer">
              Arms
            </span>

            <span className="px-1 text-gray-400 w-14 flex justify-center items-center">
              Stamina
            </span>

            <span className="px-1 text-gray-400 w-14 flex justify-center items-center">
              Cardio
            </span>

            <span className="px-1 text-gray-400 w-14 flex justify-center items-center">
              Legs
            </span>

            <span className="px-1 text-gray-400 w-14 flex justify-center items-center">
              Abdominal
            </span>
          </div>
        </div>
      </div>

      {/* All classes */}
      <div className="my-[100px]">
        <h2 className="mt-4 text-3xl text-center font-bold text-blue-900 sm:text-4xl xl:text-5xl">
          Featured Classes
        </h2>

        <div className="w-[80%] mx-auto mt-[60px] grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-10">
          {data.map((item, index) => (
            <Card className="bg-gray-200 shadow-xl" key={index}>
              <CardBody>
                <Typography variant="h5" color="blue-gray" className="mb-2">
                  <div className="line-clamp-1">{item.classTitle}</div>
                </Typography>
                <Typography>
                  <div className="line-clamp-3">{item.classDescription}</div>
                </Typography>
              </CardBody>
              <CardFooter className="pt-0">
                <Link to={`/class/details/${item._id}`}>
                  <Button>See Details</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Classes;
