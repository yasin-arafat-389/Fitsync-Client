import { Button } from "@material-tailwind/react";

const RequestSalary = () => {
  const currentDate = new Date(Date.now());
  const monthName = new Intl.DateTimeFormat("en-US", { month: "long" }).format(
    currentDate
  );
  const fullYear = currentDate.getFullYear();

  return (
    <div>
      <div className="text-2xl font-bold flex gap-3 justify-center items-center mt-5">
        Request Salary for{" "}
        <Button className="bg-pink-400 font-bold">
          {monthName}, {fullYear}
        </Button>
      </div>
    </div>
  );
};

export default RequestSalary;
