import { useQuery } from "@tanstack/react-query";
import DashboardLoader from "../../../Utilities/DashboardLoader/DashboardLoader";
import useAxios from "../../../Hooks/useAxios";
import { Button, Dialog, Typography } from "@material-tailwind/react";
import { useState } from "react";
import Payment from "../../../Components/Payment/Payment";
import useBalance from "../../../Hooks/useBalance";

const AllTrainers = () => {
  let axios = useAxios();
  let [balance] = useBalance();

  let {
    data: trainers,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allTrainers"],
    queryFn: async () => {
      let res = await axios.get(`/all-trainers`).then();
      return res.data;
    },
  });

  // Handling payment
  let [details, setDetails] = useState();
  const [openModal, setOpenModal] = useState(false);
  let handleOpenModal = (item) => {
    setOpenModal(!openModal);
    setDetails(item);
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const currentMonthIndex = new Date().getMonth();
  const currentMonthName = monthNames[currentMonthIndex];

  let handlePaySalary = async () => {
    const id = details?._id;
    const status = "paid";
    await axios.put(`/update-salary-status/${id}`, { status });
    refetch();
    setOpenModal(!openModal);
  };

  if (isLoading) {
    return <DashboardLoader />;
  }

  // console.log(trainers);

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
                Salary status
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
          <>
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
                  <div className="text-left font-bold text-[16px]">
                    <div
                      className={`inline p-2 rounded-lg ${
                        item.salary === "due" ? "bg-gray-400" : "bg-green-400"
                      }`}
                    >
                      {item.salary === "due" ? "Pending" : "Paid"}
                    </div>
                  </div>
                </td>
                <td className="p-2 whitespace-nowrap">
                  <div className="text-left font-bold text-[16px]">
                    <Button
                      onClick={() => handleOpenModal(item)}
                      className="bg-blue-500"
                      disabled={item.salary === "paid"}
                    >
                      Pay Salary
                    </Button>
                  </div>
                </td>
              </tr>
            ))}

            <Dialog open={openModal} handler={handleOpenModal}>
              <div className="flex justify-center items-center my-5">
                <Typography variant="h5" color="blue-gray">
                  Please pay by card (Visa, Mastercard etc..)
                </Typography>
              </div>

              <div className="flex flex-col justify-center items-center gap-2">
                <h1 className="text-[18px] font-bold text-gray-700">
                  Current Balance:{" "}
                  <span className="text-blue-500">
                    ${balance?.totalBalance}
                  </span>
                </h1>
                <h1 className="text-[18px] font-bold text-gray-700">
                  Trainer Name:{" "}
                  <span className="text-blue-500">{details?.name}</span>
                </h1>
                <h1 className="text-[18px] font-bold text-gray-700">
                  Salary: <span className="text-blue-500">$20</span>
                </h1>
                <h1 className="text-[18px] font-bold text-gray-700">
                  Month:{" "}
                  <span className="text-blue-500">{currentMonthName}</span>
                </h1>
                <h1 className="text-[18px] font-bold text-gray-700">
                  Remaining Balance After Payment:{" "}
                  <span className="text-blue-500">
                    ${balance?.totalBalance - 20}
                  </span>
                </h1>
              </div>

              <div className="p-5 w-full">
                <Payment func={handlePaySalary} ho={handleOpenModal} />
              </div>
            </Dialog>
          </>
        </tbody>
      </table>
    </div>
  );
};

export default AllTrainers;
