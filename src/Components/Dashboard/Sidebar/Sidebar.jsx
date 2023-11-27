import { List, ListItemPrefix } from "@material-tailwind/react";
import { NavLink } from "react-router-dom";
import useRole from "../../../Hooks/useRole";
import { MdDashboard } from "react-icons/md";
import { RiUserStarFill } from "react-icons/ri";
import { HiOutlineGlobeAlt } from "react-icons/hi";
import { GiMuscleUp } from "react-icons/gi";
import { MdEditDocument } from "react-icons/md";
import { MdCurrencyExchange } from "react-icons/md";
import { FaCalendarAlt } from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";
import { MdForum } from "react-icons/md";
import { SiGoogleclassroom } from "react-icons/si";
import { FaHistory } from "react-icons/fa";
import { FaUserGear } from "react-icons/fa6";
import { AiTwotoneLike } from "react-icons/ai";

const Sidebar = () => {
  let [role] = useRole();

  return (
    <div className="hidden md:hidden lg:block">
      <div>
        <div className="w-full max-w-[20rem] bg-yellow-200 rounded-xl p-4 shadow-xl shadow-blue-gray-900/5">
          <div className="mb-2 p-4">
            <img src="https://i.ibb.co/q7L0zZ5/fit-Sync-prev-ui.png" alt="" />
          </div>
          <List>
            <NavLink to="/dashboard">
              <div className="flex p-3 font-bold">
                <ListItemPrefix>
                  <MdDashboard fontSize={"20"} />
                </ListItemPrefix>
                Dashboard
              </div>
            </NavLink>

            {/* Admin Routes */}
            {role === "admin" && (
              <NavLink to="/all-subscribers">
                <div className="flex p-3 font-bold">
                  <ListItemPrefix>
                    <RiUserStarFill fontSize={"20"} />
                  </ListItemPrefix>
                  All Subscribers
                </div>
              </NavLink>
            )}

            {role === "admin" && (
              <NavLink to="/all-trainers">
                <div className="flex p-3 font-bold">
                  <ListItemPrefix>
                    <GiMuscleUp fontSize={"20"} />
                  </ListItemPrefix>
                  All Trainers
                </div>
              </NavLink>
            )}

            {role === "admin" && (
              <NavLink to="/applied-trainers">
                <div className="flex p-3 font-bold">
                  <ListItemPrefix>
                    <MdEditDocument fontSize={"20"} />
                  </ListItemPrefix>
                  Applied Trainers
                </div>
              </NavLink>
            )}

            {role === "admin" && (
              <NavLink to="/balance">
                <div className="flex p-3 font-bold">
                  <ListItemPrefix>
                    <MdCurrencyExchange fontSize={"20"} />
                  </ListItemPrefix>
                  Balance
                </div>
              </NavLink>
            )}

            {/* Trainer routes */}
            {role === "trainer" && (
              <NavLink to="/manage-slots">
                <div className="flex p-3 font-bold">
                  <ListItemPrefix>
                    <FaCalendarAlt fontSize={"20"} />
                  </ListItemPrefix>
                  Manage Slots
                </div>
              </NavLink>
            )}

            {role === "trainer" && (
              <NavLink to="/manage-members">
                <div className="flex p-3 font-bold">
                  <ListItemPrefix>
                    <FaUsers fontSize={"20"} />
                  </ListItemPrefix>
                  Manage Members
                </div>
              </NavLink>
            )}

            {role === "trainer" && (
              <NavLink to="/add-forum">
                <div className="flex p-3 font-bold">
                  <ListItemPrefix>
                    <MdForum fontSize={"20"} />
                  </ListItemPrefix>
                  Add New Forum
                </div>
              </NavLink>
            )}

            {role === "trainer" && (
              <NavLink to="/add-class">
                <div className="flex p-3 font-bold">
                  <ListItemPrefix>
                    <SiGoogleclassroom fontSize={"20"} />
                  </ListItemPrefix>
                  Add New Class
                </div>
              </NavLink>
            )}

            {/* Member routes */}
            {role === "member" && (
              <NavLink to="/activity-log">
                <div className="flex p-3 font-bold">
                  <ListItemPrefix>
                    <FaHistory fontSize={"20"} />
                  </ListItemPrefix>
                  Activity Log
                </div>
              </NavLink>
            )}

            {role === "member" && (
              <NavLink to="/profile-settings">
                <div className="flex p-3 font-bold">
                  <ListItemPrefix>
                    <FaUserGear fontSize={"20"} />
                  </ListItemPrefix>
                  Profile Settings
                </div>
              </NavLink>
            )}

            {role === "member" && (
              <NavLink to="/recommended-classes">
                <div className="flex p-3 font-bold">
                  <ListItemPrefix>
                    <AiTwotoneLike fontSize={"20"} />
                  </ListItemPrefix>
                  Recommended Classes
                </div>
              </NavLink>
            )}

            <NavLink to="/">
              <div className="flex p-3 font-bold">
                <ListItemPrefix>
                  <HiOutlineGlobeAlt fontSize={"20"} />
                </ListItemPrefix>
                Back to site
              </div>
            </NavLink>
          </List>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
