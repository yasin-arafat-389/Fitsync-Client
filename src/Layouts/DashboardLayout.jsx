import { Outlet } from "react-router-dom";
import Sidebar from "../Components/Dashboard/Sidebar/Sidebar";
import SideDrawer from "../Components/Dashboard/DashboardNav/SideDrawer";
import useAuth from "../Hooks/useAuth";
import { Toaster } from "react-hot-toast";

const DashboardLayout = () => {
  let { user } = useAuth();

  return (
    <div className="">
      <div className=" w-[90%] mx-auto  ">
        {/* Top Banner */}
        <div
          className="flex items-center justify-center bg-blue-500 text-white px-6 py-3.5 rounded 
        font-[sans-serif] my-4 gap-5"
        >
          <p className="text-base">
            Welcome to your Dashboard{" "}
            <span className="font-bold ml-1">{user?.displayName}</span>
          </p>

          <div className="block md:block lg:hidden cursor-pointer">
            <SideDrawer />
          </div>
        </div>

        <div className="flex gap-5 ">
          <Sidebar />
          <div className="w-full">
            <Toaster position="top-right" reverseOrder={false} />
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
