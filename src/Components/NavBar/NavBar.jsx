import React from "react";
import "./NavBar.css";
import {
  Menu,
  MenuList,
  Card,
  IconButton,
  Collapse,
} from "@material-tailwind/react";
import ProfileMenu from "./ProfileMenu";

// Icons
import { HiBars2 } from "react-icons/hi2";
import { HiRocketLaunch } from "react-icons/hi2";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { BiLogInCircle } from "react-icons/bi";
import useAuth from "../../Hooks/useAuth";

function MyProfileMenu() {
  let { user } = useAuth();

  return (
    <div>
      {user ? (
        <ProfileMenu />
      ) : (
        <Link to="/sign-in">
          <button className="loginBTN">
            <BiLogInCircle className="text-[20px]" />
            Sign In
          </button>
        </Link>
      )}
    </div>
  );
}

function NavListMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <React.Fragment>
      <Menu allowHover open={isMenuOpen} handler={setIsMenuOpen}>
        <MenuList className="hidden w-[36rem] grid-cols-7 gap-3 overflow-visible lg:grid">
          <Card
            color="blue"
            shadow={false}
            variant="gradient"
            className="col-span-3 grid h-full w-full place-items-center rounded-md"
          >
            <HiRocketLaunch strokeWidth={1} className="h-28 w-28" />
          </Card>
        </MenuList>
      </Menu>
    </React.Fragment>
  );
}

function NavList() {
  return (
    <ul className="mb-4 mt-2 flex flex-col gap-5 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
      <NavListMenu />

      {/* Main Menu */}
      <li>
        <NavLink to="/" className="p-3 font-bold">
          Home
        </NavLink>
      </li>

      <li>
        <NavLink to="/gallery" className="p-3 font-bold">
          Gallery
        </NavLink>
      </li>

      <li>
        <NavLink to="/trainer" className="p-3 font-bold">
          Trainer
        </NavLink>
      </li>

      <li>
        <NavLink to="/classes" className="p-3 font-bold">
          Classes
        </NavLink>
      </li>

      <li>
        <NavLink to="/community" className="p-3 font-bold">
          Community
        </NavLink>
      </li>
    </ul>
  );
}

export default function NavBar() {
  const [isNavOpen, setIsNavOpen] = React.useState(false);

  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate();
  };

  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false)
    );
  }, []);

  return (
    <div className="mx-auto p-2 shadow-lg sticky top-0 bg-[#eef1f3] z-20">
      <div className="w-[95%] mx-auto flex items-center text-blue-gray-900 justify-between">
        <img
          onClick={handleGoHome}
          className="w-[40%] md:w-[30%] lg:w-[20%] cursor-pointer"
          src="https://i.ibb.co/q7L0zZ5/fit-Sync-prev-ui.png"
          alt=""
        />
        <div className="absolute top-2/4 left-2/4 hidden -translate-x-2/4 -translate-y-2/4 lg:block">
          <NavList />
        </div>
        <IconButton
          size="sm"
          color="blue-gray"
          variant="text"
          onClick={toggleIsNavOpen}
          className="ml-auto mr-2 lg:hidden"
        >
          <HiBars2 className="h-6 w-6" />
        </IconButton>
        {/* <ProfileMenu /> */}
        <MyProfileMenu />
      </div>
      <Collapse open={isNavOpen} className="overflow-scroll">
        <NavList />
      </Collapse>
    </div>
  );
}
