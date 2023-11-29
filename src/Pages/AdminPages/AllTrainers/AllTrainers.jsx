import { useQuery } from "@tanstack/react-query";
import DashboardLoader from "../../../Utilities/DashboardLoader/DashboardLoader";
import useAxios from "../../../Hooks/useAxios";
import { Button } from "@material-tailwind/react";

const AllTrainers = () => {
  let axios = useAxios();

  let { data: trainers, isLoading } = useQuery({
    queryKey: ["allTrainers"],
    queryFn: async () => {
      let res = await axios.get(`/all-trainers`).then();
      return res.data;
    },
  });

  if (isLoading) {
    return <DashboardLoader />;
  }

  console.log(trainers);

  return (
    <div>
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
                Trainer Since
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
                <div className="text-left font-bold text-[16px]">Yesterday</div>
              </td>
              <td className="p-2 whitespace-nowrap">
                <div className="text-left font-bold text-[16px]">
                  <Button className="bg-blue-500">Pay Salary</Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllTrainers;
