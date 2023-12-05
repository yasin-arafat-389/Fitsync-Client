import useAuth from "../../Hooks/useAuth";
import useAxios from "../../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import DashboardLoader from "../../Utilities/DashboardLoader/DashboardLoader";
import NoDataFound from "../../Utilities/NoDataFound/NoDataFound";

const SalaryHistory = () => {
  // Handle request salary
  let { user } = useAuth();
  let axios = useAxios();

  let { data = [], isLoading } = useQuery({
    queryKey: ["salaryDataSingle", user?.displayName],
    queryFn: async () => {
      let res = await axios
        .get(`/salary/single?name=${user?.displayName}`)
        .then();
      return res.data;
    },
  });

  if (isLoading) {
    return <DashboardLoader />;
  }

  return (
    <div>
      {data.length === 0 ? (
        <div className="mt-5">
          <NoDataFound text="No salary history to show" />
        </div>
      ) : (
        <>
          <div className="mt-10">
            <div className="w-full  mb-10 ml-0 md:ml-6 lg:ml-6 bg-gray-200 shadow-lg rounded-sm border border-gray-200">
              <header className="px-5 py-4 border-b border-gray-100">
                <h2 className="font-semibold text-gray-800 text-xl">
                  Salary History
                </h2>
              </header>
              <div className="p-3">
                <div className="">
                  <table className="table-auto w-full">
                    <thead className="text-xs font-semibold uppercase text-white bg-blue-500">
                      <tr>
                        <th className="p-2 whitespace-nowrap">
                          <div className="font-semibold text-center capitalize text-[18px] p-1">
                            Month
                          </div>
                        </th>
                        <th className="p-2 whitespace-nowrap">
                          <div className="font-semibold text-center capitalize text-[18px] p-1">
                            Year
                          </div>
                        </th>
                        <th className="p-2 whitespace-nowrap">
                          <div className="font-semibold text-center capitalize text-[18px] p-1">
                            Status
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-sm divide-y divide-gray-100">
                      {data.map((item, index) => (
                        <tr key={index}>
                          <td className="p-2 whitespace-nowrap">
                            <div className="flex items-center justify-center">
                              <div className="font-medium text-gray-800 text-[18px]">
                                {item?.previousMonthName}
                              </div>
                            </div>
                          </td>
                          <td className="p-2 whitespace-nowrap">
                            <div className="flex items-center justify-center">
                              <div className="font-medium text-gray-800 text-[18px]">
                                {item?.fullYear}
                              </div>
                            </div>
                          </td>
                          <td className="p-2 whitespace-nowrap">
                            <div className="flex items-center justify-center">
                              <div
                                className={`font-medium capitalize p-2 rounded-lg text-[18px] text-white ${
                                  item?.status === "due"
                                    ? "bg-gray-500"
                                    : "bg-green-500"
                                }`}
                              >
                                {item?.status}
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SalaryHistory;
