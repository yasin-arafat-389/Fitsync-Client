import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Rectangle,
  XAxis,
  YAxis,
} from "recharts";
import DashboardLoader from "../../../Utilities/DashboardLoader/DashboardLoader";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../Hooks/useAxios";
import { MdCurrencyExchange } from "react-icons/md";
import { FaCcVisa } from "react-icons/fa6";
import useBalance from "../../../Hooks/useBalance";

const Balance = () => {
  let axios = useAxios();
  let [balance] = useBalance();

  let { data: subscribers = [], isLoading } = useQuery({
    queryKey: ["allSubscribers"],
    queryFn: async () => {
      let res = await axios.get("/all-Subscribers").then();
      return res.data;
    },
  });

  let { data: totalPaidMembers = [], isLoading: isMemberLoading } = useQuery({
    queryKey: ["allPaidMembers"],
    queryFn: async () => {
      let res = await axios.get("/package/subscribed").then();
      return res.data;
    },
  });

  let totalSubscribers;
  let totalPaidMember = totalPaidMembers.length;
  let amt = 100;

  if (subscribers.length) {
    totalSubscribers = subscribers.length;
  }

  if (isLoading || isMemberLoading) {
    return <DashboardLoader />;
  }

  const data = [
    {
      "Newsletter Subscription": totalSubscribers,
      "Paid Members": totalPaidMember,
      amt: amt,
    },
  ];

  return (
    <div>
      {/* Cards */}
      <div className="max-w-7xl w-full mx-auto py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row w-full gap-10 mb-2 lg:mb-4">
          <div className="w-full lg:w-2/5">
            <div className="widget w-full p-4 rounded-lg bg-gray-200 border-l-4 border-purple-400">
              <div className="flex items-center">
                <div className="icon w-14 p-3.5 bg-purple-400 text-white rounded-full mr-3">
                  <MdCurrencyExchange fontSize={"30"} />
                </div>
                <div className="flex flex-col justify-center">
                  <div className="text-xl font-bold">
                    ${balance?.totalBalance}
                  </div>
                  <div className="text-sm text-gray-600 font-bold">
                    Total Remaining Balance
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-2/5">
            <div className="widget w-full p-4 rounded-lg bg-gray-200 border-l-4 border-blue-400">
              <div className="flex items-center">
                <div className="icon w-14 p-3.5 bg-blue-400 text-white rounded-full mr-3">
                  <FaCcVisa fontSize={"30"} />
                </div>
                <div className="flex flex-col justify-center">
                  <div className="text-xl font-bold">${balance?.totalPaid}</div>
                  <div className="text-sm text-gray-600 font-bold">
                    Total Salary Paid
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chart */}
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />

        <Legend />
        <Bar
          dataKey="Paid Members"
          fill="#8884d8"
          activeBar={<Rectangle fill="pink" stroke="blue" />}
        />
        <Bar
          dataKey="Newsletter Subscription"
          fill="#82ca9d"
          activeBar={<Rectangle fill="gold" stroke="purple" />}
        />
      </BarChart>
    </div>
  );
};

export default Balance;
