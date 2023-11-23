import {
  Card,
  List,
  ListItemPrefix,
  Typography,
} from "@material-tailwind/react";
import { NavLink } from "react-router-dom";
import useRole from "../../../Hooks/useRole";

const Sidebar = () => {
  let [role] = useRole();

  return (
    <div className="hidden md:hidden lg:block">
      <div>
        <Card className="w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
          <div className="mb-2 p-4">
            <Typography variant="h5" color="blue-gray">
              Sidebar
            </Typography>
          </div>
          <List>
            <NavLink to="/dashboard">
              <div className="flex p-3 font-bold">
                <ListItemPrefix>Hi</ListItemPrefix>
                Dashboard
              </div>
            </NavLink>

            <NavLink to="/e-commerce">
              <div className="flex p-3 font-bold">
                <ListItemPrefix>Hi</ListItemPrefix>
                E-Commerce
              </div>
            </NavLink>

            {role === "admin" && (
              <NavLink to="/admin">
                <div className="flex p-3 font-bold">
                  <ListItemPrefix>Hi</ListItemPrefix>
                  Profile
                </div>
              </NavLink>
            )}

            {role === "user" && (
              <NavLink to="/payment">
                <div className="flex p-3 font-bold">
                  <ListItemPrefix>Hi</ListItemPrefix>
                  Payment
                </div>
              </NavLink>
            )}

            <NavLink to="/">
              <div className="flex p-3 font-bold">
                <ListItemPrefix>Hi</ListItemPrefix>
                Back to site
              </div>
            </NavLink>
          </List>
        </Card>
      </div>
    </div>
  );
};

export default Sidebar;
