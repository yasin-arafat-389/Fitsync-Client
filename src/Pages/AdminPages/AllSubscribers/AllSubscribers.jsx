import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../Hooks/useAxios";
import DashboardLoader from "../../../Utilities/DashboardLoader/DashboardLoader";
import { Helmet } from "react-helmet-async";
import { Card, Typography } from "@material-tailwind/react";

const AllSubscribers = () => {
  let axios = useAxios();

  let { data = [], isLoading } = useQuery({
    queryKey: ["allSubscribers"],
    queryFn: async () => {
      let res = await axios.get("/all-Subscribers").then();
      return res.data;
    },
  });

  if (isLoading) {
    return <DashboardLoader />;
  }

  return (
    <div>
      <Helmet>
        <title>FitSync | All Subscribers</title>
      </Helmet>

      <Card className="h-full w-full ">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
                  variant="h5"
                  color="blue-gray"
                  className="font-bold leading-none opacity-70"
                >
                  Name
                </Typography>
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
                  variant="h5"
                  color="blue-gray"
                  className="font-bold leading-none opacity-70"
                >
                  Email
                </Typography>
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className="even:bg-blue-gray-50/50">
                <td className="p-2 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className=" text-gray-800 font-bold text-[16px]">
                      {item.name}
                    </div>
                  </div>
                </td>
                <td className="p-2 whitespace-nowrap">
                  <div className="text-left font-bold text-[16px]">
                    {item.email}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default AllSubscribers;
