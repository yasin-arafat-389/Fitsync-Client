import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../Hooks/useAxios";
import RouteChangeLoader from "../../../Utilities/RouteChangeLoader/RouteChangeLoader";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";

const RecommendedClasses = () => {
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

  const itemsToDisplay = [data[0], data[data.length - 1]];

  return (
    <div>
      <h2 className="mt-4 text-2xl text-center font-bold text-blue-900 sm:text-4xl xl:text-3xl">
        We recommend you these classes
      </h2>

      <div className="w-[80%] mx-auto mt-[60px] grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-10">
        {itemsToDisplay.map((item, index) => (
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
  );
};

export default RecommendedClasses;
