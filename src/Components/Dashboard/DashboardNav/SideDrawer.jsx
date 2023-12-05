import { Card, Drawer, List, ListItemPrefix } from "@material-tailwind/react";
import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { NavLink, useNavigate } from "react-router-dom";
import useRole from "../../../Hooks/useRole";
import { RiUserStarFill } from "react-icons/ri";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { GiMuscleUp } from "react-icons/gi";
import { MdEditDocument } from "react-icons/md";
import { MdCurrencyExchange } from "react-icons/md";
import { FaCalendarAlt } from "react-icons/fa";
import { FaPowerOff, FaUsers } from "react-icons/fa6";
import { MdForum } from "react-icons/md";
import { SiGoogleclassroom } from "react-icons/si";
import { FaHistory } from "react-icons/fa";
import { FaUserGear } from "react-icons/fa6";
import { AiTwotoneLike } from "react-icons/ai";
import { IoMdArrowRoundBack } from "react-icons/io";
import useAuth from "../../../Hooks/useAuth";
import toast from "react-hot-toast";

const SideDrawer = () => {
  let [role] = useRole();
  const [open, setOpen] = React.useState(false);

  let { logOut } = useAuth();
  let navigate = useNavigate();

  let handleLogOut = () => {
    logOut()
      .then(() => {
        navigate("/sign-in");
        toast.success("Successfully Logged out!");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  return (
    <div>
      <div>
        <GiHamburgerMenu onClick={openDrawer} className="text-[25px]" />

        <Drawer open={open} onClose={closeDrawer} className="p-4">
          <Card className="w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
            <div className="mb-2 p-4">
              <div>
                <img
                  src="https://i.ibb.co/q7L0zZ5/fit-Sync-prev-ui.png"
                  alt=""
                />
              </div>
            </div>
            <List>
              {/* Admin Routes */}
              {role === "admin" && (
                <NavLink to="/all-subscribers" onClick={closeDrawer}>
                  <div className="flex p-3 font-bold">
                    <ListItemPrefix>
                      <RiUserStarFill fontSize={"20"} />
                    </ListItemPrefix>
                    All Subscribers
                  </div>
                </NavLink>
              )}

              {role === "admin" && (
                <NavLink to="/all-trainers" onClick={closeDrawer}>
                  <div className="flex p-3 font-bold">
                    <ListItemPrefix>
                      <GiMuscleUp fontSize={"20"} />
                    </ListItemPrefix>
                    All Trainers
                  </div>
                </NavLink>
              )}

              {role === "admin" && (
                <NavLink to="/applied-trainers" onClick={closeDrawer}>
                  <div className="flex p-3 font-bold">
                    <ListItemPrefix>
                      <MdEditDocument fontSize={"20"} />
                    </ListItemPrefix>
                    Applied Trainers
                  </div>
                </NavLink>
              )}

              {role === "admin" && (
                <NavLink to="/balance" onClick={closeDrawer}>
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
                <NavLink to="/manage-slots" onClick={closeDrawer}>
                  <div className="flex p-3 font-bold">
                    <ListItemPrefix>
                      <FaCalendarAlt fontSize={"20"} />
                    </ListItemPrefix>
                    Manage Slots
                  </div>
                </NavLink>
              )}

              {role === "trainer" && (
                <NavLink to="/manage-members" onClick={closeDrawer}>
                  <div className="flex p-3 font-bold">
                    <ListItemPrefix>
                      <FaUsers fontSize={"20"} />
                    </ListItemPrefix>
                    Manage Members
                  </div>
                </NavLink>
              )}

              {role === "trainer" && (
                <NavLink to="/add-forum" onClick={closeDrawer}>
                  <div className="flex p-3 font-bold">
                    <ListItemPrefix>
                      <MdForum fontSize={"20"} />
                    </ListItemPrefix>
                    Add New Forum
                  </div>
                </NavLink>
              )}

              {role === "trainer" && (
                <NavLink to="/add-class" onClick={closeDrawer}>
                  <div className="flex p-3 font-bold">
                    <ListItemPrefix>
                      <SiGoogleclassroom fontSize={"20"} />
                    </ListItemPrefix>
                    Add New Class
                  </div>
                </NavLink>
              )}

              {role === "trainer" && (
                <NavLink to="/salary-history" onClick={closeDrawer}>
                  <div className="flex p-3 font-bold">
                    <ListItemPrefix>
                      <FaMoneyCheckDollar fontSize={"20"} />
                    </ListItemPrefix>
                    Salary History
                  </div>
                </NavLink>
              )}

              {/* Member routes */}
              {role === "member" && (
                <NavLink to="/activity-log" onClick={closeDrawer}>
                  <div className="flex p-3 font-bold">
                    <ListItemPrefix>
                      <FaHistory fontSize={"20"} />
                    </ListItemPrefix>
                    Activity Log
                  </div>
                </NavLink>
              )}

              {role === "member" && (
                <NavLink to="/profile-settings" onClick={closeDrawer}>
                  <div className="flex p-3 font-bold">
                    <ListItemPrefix>
                      <FaUserGear fontSize={"20"} />
                    </ListItemPrefix>
                    Profile Settings
                  </div>
                </NavLink>
              )}

              {role === "member" && (
                <NavLink to="/recommended-classes" onClick={closeDrawer}>
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
                    <IoMdArrowRoundBack fontSize={"20"} />
                  </ListItemPrefix>
                  Back to site
                </div>
              </NavLink>

              <button className="bg-transparent" onClick={handleLogOut}>
                <div className="flex p-3 font-bold">
                  <ListItemPrefix>
                    <FaPowerOff fontSize={"20"} />
                  </ListItemPrefix>
                  Sign Out
                </div>
              </button>
            </List>
          </Card>
        </Drawer>
      </div>
    </div>
  );
};

export default SideDrawer;
