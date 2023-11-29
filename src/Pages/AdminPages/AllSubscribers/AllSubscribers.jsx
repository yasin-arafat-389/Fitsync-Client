import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../Hooks/useAxios";
import DashboardLoader from "../../../Utilities/DashboardLoader/DashboardLoader";

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
      <table className="table-auto w-full">
        <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-300">
          <tr>
            <th className="p-2 whitespace-nowrap">
              <div className="font-semibold text-left text-black text-[17px]">
                Name
              </div>
            </th>
            <th className="p-2 whitespace-nowrap">
              <div className="font-semibold text-left text-black text-[17px]">
                Email
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="text-sm divide-y divide-gray-100">
          {data.map((item, index) => (
            <tr key={index}>
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
    </div>
  );
};

export default AllSubscribers;
