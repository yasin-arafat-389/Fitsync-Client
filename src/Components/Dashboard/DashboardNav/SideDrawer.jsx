import {
  Card,
  Drawer,
  List,
  ListItemPrefix,
  Typography,
} from "@material-tailwind/react";
import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { NavLink } from "react-router-dom";

const SideDrawer = () => {
  const [open, setOpen] = React.useState(false);

  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  return (
    <div>
      <div>
        <GiHamburgerMenu onClick={openDrawer} className="text-[25px]" />

        <Drawer open={open} onClose={closeDrawer} className="p-4">
          <Card className="w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
            <div className="mb-2 p-4">
              <Typography variant="h5" color="blue-gray">
                Sidebar
              </Typography>
            </div>
            <List>
              <NavLink to="/dashboard" onClick={closeDrawer}>
                <div className="flex p-3 font-bold">
                  <ListItemPrefix>Hi</ListItemPrefix>
                  Dashboard
                </div>
              </NavLink>

              <NavLink to="/e-commerce" onClick={closeDrawer}>
                <div className="flex p-3 font-bold">
                  <ListItemPrefix>Hi</ListItemPrefix>
                  E-Commerce
                </div>
              </NavLink>

              <NavLink to="/admin" onClick={closeDrawer}>
                <div className="flex p-3 font-bold">
                  <ListItemPrefix>Hi</ListItemPrefix>
                  Profile
                </div>
              </NavLink>
            </List>
          </Card>
        </Drawer>
      </div>
    </div>
  );
};

export default SideDrawer;
