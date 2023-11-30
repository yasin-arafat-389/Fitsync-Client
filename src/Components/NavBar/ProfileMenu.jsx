import {
  Avatar,
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import React from "react";
// import { AiOutlineUser } from "react-icons/ai";
import { AiOutlinePoweroff } from "react-icons/ai";
import { BsChevronDown } from "react-icons/bs";
import { MdDashboard } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "../../Hooks/useAuth";
import useRole from "../../Hooks/useRole";

const ProfileMenu = () => {
  let { user, logOut } = useAuth();
  let navigate = useNavigate();
  let [role] = useRole();

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

  let handleGoToDashboard = () => {
    if (role === "admin") {
      navigate("/all-subscribers");
    }
    if (role === "trainer") {
      navigate("/manage-slots");
    }
    if (role === "member") {
      navigate("/activity-log");
    }
  };

  // let handleGoToProfile = () => {
  //   navigate("/profile");
  // };

  const profileMenuItems = [
    {
      label: "Dashboard",
      icon: <MdDashboard />,
      action: handleGoToDashboard,
    },
    // {
    //   label: "Profile",
    //   icon: <AiOutlineUser fontSize={"20px"} />,
    //   action: handleGoToProfile,
    // },
    {
      label: "Sign Out",
      icon: <AiOutlinePoweroff fontSize={"20px"} />,
      action: handleLogOut,
    },
  ];

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <Avatar
            variant="circular"
            size="sm"
            alt="tania andrew"
            className="border border-gray-900 p-0.5"
            src={
              user?.photoURL
                ? user?.photoURL
                : "https://i.ibb.co/HN9NtYY/user.png"
            }
          />
          <BsChevronDown
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>

      <MenuList className="p-1">
        {profileMenuItems.map((item, index) => (
          <MenuItem key={index} onClick={closeMenu}>
            <button
              onClick={item.action}
              className="flex justify-center items-center gap-4 text-[15px] font-bold"
            >
              <span>{item.icon}</span>
              {item.label}
            </button>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default ProfileMenu;
